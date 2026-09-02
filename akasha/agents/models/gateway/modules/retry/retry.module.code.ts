import {
  type IdleResettable,
  UPSTREAM_IDLE_TIMEOUT_TOKEN,
} from "../idle-timeout/idle-timeout.module.code.ts"
import {
  buildKeepaliveEmitter,
  KEEPALIVE_COMMENT_BYTES,
  type KeepaliveEmitter,
  type KeepaliveOptions,
} from "../keepalive/keepalive.module.code.ts"
import { buildAnthropicSseErrorFrame } from "../sse-error-frame/sse-error-frame.module.code.ts"

export const TRANSPORT_RETRY_BACKOFF_MS = [200, 800] as const

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

function safeCall<A extends ReadonlyArray<unknown>>(
  fn: ((...args: A) => void) | undefined,
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

  let released = false
  function safeRelease(): undefined {
    if (released) return
    released = true
    reader.releaseLock()
  }

  let cancelled = false

  let closed = false
  let ka: KeepaliveEmitter | null = null

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let atLineBoundary = true
      if (keepalive != null && keepalive.intervalMs > 0) {
        ka = buildKeepaliveEmitter(
          keepalive.intervalMs,
          () => {
            if (closed || !atLineBoundary) return
            controller.enqueue(KEEPALIVE_COMMENT_BYTES)
          },
          keepalive.timers
        )
      }
      try {
        if (firstChunk.value !== undefined) {
          controller.enqueue(firstChunk.value)
          if (firstChunk.value.byteLength > 0) {
            atLineBoundary = firstChunk.value[firstChunk.value.byteLength - 1] === 0x0a
          }
        }
        if (firstChunk.done) {
          if (!cancelled) safeCall(observer?.onComplete, now())
          controller.close()
          return
        }
        ka?.reset()
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            if (!cancelled) safeCall(observer?.onComplete, now())
            controller.close()
            return
          }
          if (value !== undefined) {
            idle?.reset()
            ka?.reset()
            safeCall(observer?.onChunkBytes, value, now())
            safeCall(observer?.onChunk, value.byteLength, now())
            controller.enqueue(value)
            if (value.byteLength > 0) {
              atLineBoundary = value[value.byteLength - 1] === 0x0a
            }
          }
        }
      } catch (streamErr) {
        if (!cancelled) safeCall(observer?.onUpstreamError, streamErr, now())
        if (emitSseErrorFrame && !cancelled) {
          const { errorType, message } = buildMidStreamTransportSseError(streamErr)
          try {
            if (!atLineBoundary) controller.enqueue(NEWLINE_BYTES)
            controller.enqueue(buildAnthropicSseErrorFrame(errorType, message))
            controller.close()
            return
          } catch {}
        }
        controller.error(streamErr)
      } finally {
        closed = true
        ka?.stop()
        idle?.stop()
        safeRelease()
      }
    },
    async cancel(reason) {
      cancelled = true
      closed = true
      ka?.stop()
      idle?.stop()
      safeCall(observer?.onDownstreamCancel, reason, now())
      if (released) return
      try {
        await reader.cancel(reason)
      } finally {
        safeRelease()
      }
    },
  })
}
