import {
  copyRequestHeaders,
  copyResponseHeaders,
} from "akasha/agent/model/gateway/modules/gateway-headers/gateway-headers.module.code.ts"
import {
  fetchWithIdleGuard,
  type IdleFetch,
  type IdleTimers,
} from "akasha/agent/model/gateway/modules/idle-timeout/idle-timeout.module.code.ts"
import type { KeepaliveOptions } from "akasha/agent/model/gateway/modules/keepalive/keepalive.module.code.ts"
import type { ObserverSlot } from "akasha/agent/model/gateway/modules/observer-slot/observer-slot.module.code.ts"
import {
  pullFirstChunkAndWrap,
  type StreamClock,
} from "akasha/agent/model/gateway/modules/retry/retry.module.code.ts"
import {
  buildStreamObserver,
  type ShutdownFlushRegistry,
  type TransportLogAt,
} from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.code.ts"

const ANTHROPIC_BASE = "https://api.anthropic.com"

const API_KEY_HEADER = "x-api-key"

const AUTHORIZATION = "authorization"

const IDLE_GUARDED_PATHS = new Set(["/v1/messages", "/v1/messages/count_tokens"])

const EVENT_STREAM_TYPE = "text/event-stream"

const REPLACED_REASON = "observer_replaced"

const NO_ACCOUNT = "-"

export type Upstream = {
  readonly base: string
  readonly header: string
  readonly value: string
}

export function keyedUpstream(base: string, apiKey: string): Upstream {
  return { base, header: API_KEY_HEADER, value: apiKey }
}

export type Forward = (
  incoming: Request,
  accessToken: string | null,
  bodyBuffer: ArrayBuffer | null,
  account: string | null,
  observerSlot: ObserverSlot,
  sentTo?: Upstream
) => Promise<Response>

type ForwardDeps = {
  idleTimeoutMs: number
  downstreamKeepaliveMs: number
  logPrefix: string
  base?: string | undefined
  logAt?: TransportLogAt | undefined
  shutdownRegistry?: ShutdownFlushRegistry | undefined
  now?: StreamClock | undefined
  timers?: IdleTimers | undefined
  fetchImpl?: IdleFetch | undefined
}

function upstreamHeaders(
  incoming: Request,
  accessToken: string | null,
  sentTo: Upstream | undefined
): Headers {
  const headers = copyRequestHeaders(incoming)
  if (sentTo !== undefined) {
    headers.set(sentTo.header, sentTo.value)
    return headers
  }
  const authorization =
    accessToken === null ? incoming.headers.get(AUTHORIZATION) : `Bearer ${accessToken}`
  if (authorization !== null) headers.set(AUTHORIZATION, authorization)
  return headers
}

export function buildForward(deps: ForwardDeps): Forward {
  const { idleTimeoutMs, downstreamKeepaliveMs, logPrefix, logAt, shutdownRegistry } = deps
  const now = deps.now ?? Date.now
  const anthropic = deps.base ?? ANTHROPIC_BASE

  return async function forward(incoming, accessToken, bodyBuffer, account, observerSlot, sentTo) {
    const url = new URL(incoming.url)
    const base = sentTo?.base ?? anthropic
    const headers = upstreamHeaders(incoming, accessToken, sentTo)
    const guarded = idleTimeoutMs > 0 && IDLE_GUARDED_PATHS.has(url.pathname)
    const startMs = now()

    const { response: upstream, idle } = await fetchWithIdleGuard(
      `${base}${url.pathname}${url.search}`,
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
    const keepalive: KeepaliveOptions | undefined =
      keepaliveMs <= 0
        ? undefined
        : deps.timers === undefined
          ? { intervalMs: keepaliveMs }
          : { intervalMs: keepaliveMs, timers: deps.timers }

    const wrappedBody = await pullFirstChunkAndWrap(
      upstream.body,
      observer,
      idle,
      keepalive,
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
