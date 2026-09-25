import {
  type IdleResettable,
  UPSTREAM_IDLE_TIMEOUT_TOKEN,
} from "akasha/agent/model/gateway/modules/idle-timeout/idle-timeout.module.code.ts"
import {
  buildKeepaliveEmitter,
  KEEPALIVE_COMMENT_BYTES,
  type KeepaliveEmitter,
  type KeepaliveOptions,
} from "akasha/agent/model/gateway/modules/keepalive/keepalive.module.code.ts"
import { buildAnthropicSseErrorFrame } from "akasha/agent/model/gateway/modules/sse-error-frame/sse-error-frame.module.code.ts"

const TRANSPORT_RETRY_BACKOFF_MS = [200, 800] as const

const NEWLINE_BYTES = new Uint8Array([0x0a])

const TRANSIENT_TRANSPORT_PHRASES = [
  "socket connection was closed unexpectedly",
  "socket close",
  "socket hang up",
  "connection reset",
  "network unreachable",
  "timed out",
] as const

const TRANSIENT_TRANSPORT_CODES = /\b(?:econnreset|eof|epipe)\b/

export function isTransientTransportError(err: unknown): err is TypeError | DOMException {
  if (err instanceof DOMException) {
    return err.name === "TimeoutError" && err.message.includes(UPSTREAM_IDLE_TIMEOUT_TOKEN)
  }
  if (!(err instanceof TypeError)) return false
  const msg = err.message.toLowerCase()
  if (TRANSIENT_TRANSPORT_CODES.test(msg)) return true
  return TRANSIENT_TRANSPORT_PHRASES.some((phrase) => msg.includes(phrase))
}

export type TransportSleep = (ms: number) => Promise<void>

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function withTransportRetry<T>(
  op: () => Promise<T>,
  log: string,
  label: string,
  backoffMs: readonly number[] = TRANSPORT_RETRY_BACKOFF_MS,
  sleep: TransportSleep = defaultSleep
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await op()
    } catch (err) {
      if (!isTransientTransportError(err)) throw err
      if (attempt >= backoffMs.length) throw err
      const wait = backoffMs[attempt] ?? 0
      console.warn(
        `${log} ${label} transient transport error (${err.message}); backing off ${wait}ms before retry ${attempt + 1}/${backoffMs.length}`
      )
      await sleep(wait)
    }
  }
}

export type StreamObserver = {
  onChunk: (bytes: number, atMs: number) => void
  onComplete: (atMs: number) => void
  onUpstreamError: (err: unknown, atMs: number) => void
  onDownstreamCancel: (reason: unknown, atMs: number) => void
  onChunkBytes?: (chunk: Uint8Array, atMs: number) => void
  onUpstreamStatus?: (status: number, atMs: number) => void
  onClientDisconnect?: (reason: string, atMs: number) => void
  onProxyShutdown?: (reason: string, atMs: number) => void
}

export type StreamClock = () => number

type Sink = ReadableStreamDefaultController<Uint8Array>

function safeCall<A extends ReadonlyArray<unknown>>(
  fn: ((...given: A) => void) | undefined,
  ...args: A
): undefined {
  try {
    fn?.(...args)
  } catch {}
}

function buildMidStreamTransportSseError(err: unknown): {
  errorType: string
  message: string
} {
  const detail = err instanceof Error ? err.message : String(err)
  return {
    errorType: "api_error",
    message: `Upstream connection failed after the response committed to a stream: ${detail}`,
  }
}

export async function pullFirstChunkAndWrap(
  body: ReadableStream<Uint8Array> | null,
  observer?: StreamObserver,
  idle?: IdleResettable,
  keepalive?: KeepaliveOptions,
  emitSseErrorFrame = false,
  now: StreamClock = Date.now
): Promise<ReadableStream<Uint8Array> | null> {
  if (body == null) {
    idle?.stop()
    return null
  }

  const reader = body.getReader()
  let firstChunk: Awaited<ReturnType<typeof reader.read>>
  try {
    firstChunk = await reader.read()
  } catch (err) {
    idle?.stop()
    safeCall(observer?.onUpstreamError, err, now())
    reader.releaseLock()
    throw err
  }
  if (firstChunk.value !== undefined) {
    idle?.reset()
    safeCall(observer?.onChunkBytes, firstChunk.value, now())
    safeCall(observer?.onChunk, firstChunk.value.byteLength, now())
  }

  let ended = false
  let atLineBoundary = true
  let ka: KeepaliveEmitter | null = null

  function end(): undefined {
    ended = true
    ka?.stop()
    idle?.stop()
  }

  function send(controller: Sink, chunk: Uint8Array): undefined {
    controller.enqueue(chunk)
    if (chunk.byteLength > 0) atLineBoundary = chunk[chunk.byteLength - 1] === 0x0a
  }

  function finish(controller: Sink): undefined {
    end()
    reader.releaseLock()
    safeCall(observer?.onComplete, now())
    controller.close()
  }

  function fail(controller: Sink, err: unknown): undefined {
    end()
    reader.releaseLock()
    safeCall(observer?.onUpstreamError, err, now())
    if (!emitSseErrorFrame) {
      controller.error(err)
      return
    }
    const { errorType, message } = buildMidStreamTransportSseError(err)
    if (!atLineBoundary) controller.enqueue(NEWLINE_BYTES)
    controller.enqueue(buildAnthropicSseErrorFrame(errorType, message))
    controller.close()
  }

  return new ReadableStream<Uint8Array>({
    start(controller) {
      if (keepalive != null && keepalive.intervalMs > 0) {
        ka = buildKeepaliveEmitter(
          keepalive.intervalMs,
          () => {
            if (!ended && atLineBoundary) controller.enqueue(KEEPALIVE_COMMENT_BYTES)
          },
          keepalive.timers
        )
      }
      if (firstChunk.value !== undefined) send(controller, firstChunk.value)
      if (firstChunk.done) finish(controller)
      else ka?.reset()
    },
    async pull(controller) {
      let next: Awaited<ReturnType<typeof reader.read>>
      try {
        next = await reader.read()
      } catch (err) {
        if (!ended) fail(controller, err)
        return
      }
      if (ended) return
      if (next.done) {
        finish(controller)
        return
      }
      idle?.reset()
      ka?.reset()
      safeCall(observer?.onChunkBytes, next.value, now())
      safeCall(observer?.onChunk, next.value.byteLength, now())
      send(controller, next.value)
    },
    async cancel(reason) {
      const reading = !ended
      end()
      safeCall(observer?.onDownstreamCancel, reason, now())
      if (!reading) return
      try {
        await reader.cancel(reason)
      } finally {
        reader.releaseLock()
      }
    },
  })
}
