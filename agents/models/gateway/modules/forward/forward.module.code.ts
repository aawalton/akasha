import {
  fetchWithIdleGuard,
  type IdleFetch,
  type IdleTimers,
} from "../idle-timeout/idle-timeout.module.code.ts"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import {
  copyRequestHeaders,
  copyResponseHeaders,
} from "../proxy-headers/proxy-headers.module.code.ts"
import { pullFirstChunkAndWrap, type StreamClock } from "../retry/retry.module.code.ts"
import {
  buildStreamObserver,
  type ShutdownFlushRegistry,
  type TransportLogAt,
} from "../transport-log/transport-log.module.code.ts"

const UPSTREAM_BASE = "https://api.anthropic.com"

const IDLE_GUARDED_PATHS = new Set(["/v1/messages", "/v1/messages/count_tokens"])

const EVENT_STREAM_TYPE = "text/event-stream"

const REPLACED_REASON = "observer_replaced"

const NO_ACCOUNT = "-"

export type Forward = (
  incoming: Request,
  accessToken: string | null,
  bodyBuffer: ArrayBuffer | null,
  account: string | null,
  observerSlot: ObserverSlot
) => Promise<Response>

type ForwardDeps = {
  idleTimeoutMs: number
  downstreamKeepaliveMs: number
  logPrefix: string
  logAt?: TransportLogAt | undefined
  shutdownRegistry?: ShutdownFlushRegistry | undefined
  now?: StreamClock | undefined
  timers?: IdleTimers | undefined
  fetchImpl?: IdleFetch | undefined
}

function upstreamHeaders(incoming: Request, accessToken: string | null): Headers {
  const headers = copyRequestHeaders(incoming)
  const authorization =
    accessToken === null ? incoming.headers.get("authorization") : `Bearer ${accessToken}`
  if (authorization !== null) headers.set("authorization", authorization)
  return headers
}

export function buildForward(deps: ForwardDeps): Forward {
  const { idleTimeoutMs, downstreamKeepaliveMs, logPrefix, logAt, shutdownRegistry } = deps
  const now = deps.now ?? Date.now

  return async function forward(incoming, accessToken, bodyBuffer, account, observerSlot) {
    const url = new URL(incoming.url)
    const headers = upstreamHeaders(incoming, accessToken)
    const guarded = idleTimeoutMs > 0 && IDLE_GUARDED_PATHS.has(url.pathname)
    const startMs = now()

    const { response: upstream, idle } = await fetchWithIdleGuard(
      `${UPSTREAM_BASE}${url.pathname}${url.search}`,
      { method: incoming.method, headers, body: bodyBuffer },
      guarded
        ? {
            idleMs: idleTimeoutMs,
            logPrefix,
            label: `${account ?? NO_ACCOUNT} ${url.pathname}`,
          }
        : null,
      { timers: deps.timers, fetchImpl: deps.fetchImpl }
    )

    const wanted = logAt !== undefined || observerSlot.endInFlight !== undefined
    const observer = wanted
      ? buildStreamObserver({ account, path: url.pathname, startMs, logAt, shutdownRegistry })
      : undefined

    const replaced = observerSlot.current
    if (replaced !== null && replaced !== observer) {
      replaced.onClientDisconnect?.(REPLACED_REASON, now())
    }
    observerSlot.current = observer ?? null
    observer?.onUpstreamStatus?.(upstream.status, now())

    const contentType = upstream.headers.get("content-type") ?? ""
    const isEventStream = contentType.includes(EVENT_STREAM_TYPE)
    const keepaliveMs = isEventStream && downstreamKeepaliveMs > 0 ? downstreamKeepaliveMs : 0

    const wrappedBody = await pullFirstChunkAndWrap(
      upstream.body,
      observer,
      idle,
      keepaliveMs > 0 ? { intervalMs: keepaliveMs } : undefined,
      isEventStream,
      now
    )
    if (wrappedBody === null) observer?.onComplete(now())

    return new Response(wrappedBody, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: copyResponseHeaders(upstream),
    })
  }
}
