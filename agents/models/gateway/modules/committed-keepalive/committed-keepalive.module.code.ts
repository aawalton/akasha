import {
  classifyCommittedServed,
  mapStatusToSseError,
} from "../committed-outcome/committed-outcome.module.code.ts"
import type { HoldRegistry } from "../hold-registry/hold-registry.module.code.ts"
import {
  buildKeepaliveEmitter,
  DEFAULT_DOWNSTREAM_KEEPALIVE_MS,
  KEEPALIVE_COMMENT_BYTES,
  type KeepaliveEmitter,
  type KeepaliveTimers,
} from "../keepalive/keepalive.module.code.ts"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import type { QueueOutcome } from "../pre-forward-queue/pre-forward-queue.module.code.ts"
import { buildAnthropicSseErrorFrame } from "../sse-error-frame/sse-error-frame.module.code.ts"
import {
  buildStreamObserver,
  buildTransportEvent,
  type ObservedStreamState,
  recordTransportEvent,
  type TransportLogAt,
} from "../transport-log/transport-log.module.code.ts"

export const DEFAULT_HOLD_POLL_MS = 2000

export const COMMITTED_SSE_HEADERS: Readonly<Record<string, string>> = {
  "content-type": "text/event-stream; charset=utf-8",
  "cache-control": "no-cache",
  connection: "keep-alive",
}

const GATEWAY_FAILED_MESSAGE = "the gateway failed while holding this request"

export type CommittedKeepaliveArgs = {
  readonly observerSlot: ObserverSlot
  readonly method: string
  readonly pathname: string
  readonly logPrefix: string
  readonly attempted: () => Promise<QueueOutcome>
  readonly slept: (ms: number) => Promise<undefined>
  readonly now: () => number
  readonly keepaliveMs?: number
  readonly holdPollMs?: number
  readonly timers?: KeepaliveTimers
  readonly holdRegistry?: HoldRegistry
  readonly logAt?: TransportLogAt
  readonly emptyPoolReason?: string
}

export function buildCommittedKeepaliveResponse(args: CommittedKeepaliveArgs): Response {
  const { observerSlot, method, pathname, logPrefix, attempted, slept, now } = args
  const keepaliveMs = args.keepaliveMs ?? DEFAULT_DOWNSTREAM_KEEPALIVE_MS
  const holdPollMs = args.holdPollMs ?? DEFAULT_HOLD_POLL_MS

  const startedMs = now()
  const observer = buildStreamObserver({ account: "-", path: pathname, startMs: startedMs })
  observerSlot.current = observer

  const holdHandle = args.holdRegistry?.enter(startedMs)
  const releaseHold = (): undefined => {
    if (holdHandle !== undefined) args.holdRegistry?.exit(holdHandle)
  }

  let splicedAtMs: number | null = null
  let terminalFired = false
  const finishHold = (termination: ObservedStreamState["termination"], atMs: number): undefined => {
    if (terminalFired) return
    terminalFired = true
    const { logAt } = args
    if (logAt === undefined) return
    recordTransportEvent(
      buildTransportEvent({
        termination,
        account: "-",
        path: pathname,
        startMs: startedMs,
        endMs: atMs,
        framesUpstream: 0,
        bytesUpstream: 0,
        lastFrameMs: startedMs,
        lastEventType: null,
        sawMessageStop: false,
        httpStatus: null,
        heldMs: (splicedAtMs ?? atMs) - startedMs,
        emptyPoolReason: args.emptyPoolReason ?? null,
      }),
      logAt
    )
  }

  let closed = false
  let disconnected = false
  let activeReader: ReadableStreamDefaultReader<Uint8Array> | null = null
  let heartbeatHandle: KeepaliveEmitter | null = null

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const safeEnqueue = (bytes: Uint8Array): undefined => {
        if (closed) return
        try {
          controller.enqueue(bytes)
        } catch {
          closed = true
        }
      }
      const heartbeat = buildKeepaliveEmitter(
        keepaliveMs,
        () => safeEnqueue(KEEPALIVE_COMMENT_BYTES),
        args.timers
      )
      heartbeatHandle = heartbeat

      const finishComplete = (): undefined => {
        if (closed) return
        closed = true
        heartbeat.stop()
        try {
          controller.close()
        } catch {}
        const endedMs = now()
        observer.onComplete(endedMs)
        finishHold("complete", endedMs)
        releaseHold()
      }

      const spliceBody = async (res: Response): Promise<undefined> => {
        const body = res.body
        if (body === null) return
        const reader = body.getReader()
        activeReader = reader
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            if (closed || disconnected) {
              await reader.cancel().catch(() => {})
              break
            }
            if (value !== undefined) safeEnqueue(value)
          }
        } catch {
        } finally {
          activeReader = null
        }
      }

      const orchestrate = async (): Promise<undefined> => {
        safeEnqueue(KEEPALIVE_COMMENT_BYTES)
        if (keepaliveMs > 0) heartbeat.reset()
        console.log(`${logPrefix} committed-keepalive ${method} ${pathname} phase=hold-open`)

        while (!closed && !disconnected) {
          const outcome = await attempted()
          if (closed || disconnected) break

          if (outcome.kind === "served") {
            const res = outcome.response
            if (classifyCommittedServed(res.status) === "splice") {
              splicedAtMs = now()
              heartbeat.stop()
              console.log(
                `${logPrefix} committed-keepalive ${method} ${pathname} phase=splice status=${res.status} heldMs=${splicedAtMs - startedMs}`
              )
              await spliceBody(res)
              finishComplete()
              return
            }
            await res.body?.cancel().catch(() => {})
            const { errorType, message } = mapStatusToSseError(res.status)
            console.log(
              `${logPrefix} committed-keepalive ${method} ${pathname} phase=committed-error status=${res.status} errorType=${errorType} heldMs=${now() - startedMs}`
            )
            heartbeat.stop()
            safeEnqueue(buildAnthropicSseErrorFrame(errorType, message))
            finishComplete()
            return
          }

          observerSlot.current = observer
          await slept(holdPollMs)
        }

        finishComplete()
      }

      orchestrate().catch((thrown: unknown) => {
        console.error(
          `${logPrefix} committed-keepalive ${method} ${pathname} phase=failed heldMs=${now() - startedMs}`,
          thrown
        )
        heartbeat.stop()
        safeEnqueue(buildAnthropicSseErrorFrame("api_error", GATEWAY_FAILED_MESSAGE))
        finishComplete()
      })
    },
    cancel(): undefined {
      disconnected = true
      closed = true
      heartbeatHandle?.stop()
      const endedMs = now()
      activeReader?.cancel().catch(() => {})
      observer.onDownstreamCancel("committed_cancel", endedMs)
      finishHold("downstream_cancel", endedMs)
      releaseHold()
    },
  })

  return new Response(stream, { status: 200, headers: { ...COMMITTED_SSE_HEADERS } })
}
