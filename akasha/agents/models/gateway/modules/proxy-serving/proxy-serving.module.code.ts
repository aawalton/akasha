import { mkdirSync, rmSync } from "node:fs"
import { dirname } from "node:path"
import type { Server } from "bun"
import { buildAccountPicker } from "../account-picker/account-picker.module.code.ts"
import { type AccountWalkSeams, runAccountWalk } from "../account-walk/account-walk.module.code.ts"
import { bindWithRetry } from "../bind-with-retry/bind-with-retry.module.code.ts"
import { buildCommittedKeepaliveResponse } from "../committed-keepalive/committed-keepalive.module.code.ts"
import { buildForward, type Forward } from "../forward/forward.module.code.ts"
import { freshCredentialIn } from "../fresh-credential/fresh-credential.module.code.ts"
import { buildHoldRegistry, type HoldRegistry } from "../hold-registry/hold-registry.module.code.ts"
import type { IdleFetch, IdleTimers } from "../idle-timeout/idle-timeout.module.code.ts"
import { buildInFlightTracker } from "../in-flight/in-flight.module.code.ts"
import {
  buildMessageHandler,
  type MessageTurn,
} from "../message-handler/message-handler.module.code.ts"
import { type OAuthEffects, oauthEffectsIn } from "../oauth-effects/oauth-effects.module.code.ts"
import {
  buildEndInFlightOnce,
  type ObserverSlot,
} from "../observer-slot/observer-slot.module.code.ts"
import {
  type QueueOutcome,
  runPreForwardQueue,
} from "../pre-forward-queue/pre-forward-queue.module.code.ts"
import type { OAuthProxy, StartOAuthProxyOptions } from "../proxy-start/proxy-start.module.code.ts"
import { rateLimitResponse } from "../rate-limit-refusal/rate-limit-refusal.module.code.ts"
import {
  buildShutdownFlushRegistry,
  type TransportLogAt,
} from "../transport-log/transport-log.module.code.ts"

export const DEFAULT_LOG_PREFIX = "[oauth-proxy]"

export const HEALTH_PATH = "/healthz"

export const IN_FLIGHT_PATH = "/inflight"

export const RC_STATUS_PATH = "/rc-status"

export const MESSAGES_PATHS: ReadonlySet<string> = new Set([
  "/v1/messages",
  "/v1/messages/count_tokens",
])

const ROOT_PATH = "/"

const OK_BODY = "ok"

const OK = 200

const NO_TIMEOUT = 0

const CLIENT_ABORT = "client_abort"

const HANDLER_EXIT = "fetch_handler_exit"

export type Listening = {
  readonly port: number | undefined
  readonly stop: () => undefined
  readonly timeout: (req: Request, seconds: number) => undefined
}

export type Answering = (req: Request, listening: Listening) => Promise<Response>

export type ListenSpec =
  | { readonly port: number; readonly answered: Answering }
  | { readonly unix: string; readonly answered: Answering }

export type ServingParts = {
  readonly logPrefix: string
  readonly oauth: OAuthEffects
  readonly forward: Forward
  readonly holds: HoldRegistry
  readonly logAt: TransportLogAt | undefined
  readonly now: () => number
  readonly slept: (ms: number) => Promise<undefined>
  readonly said: (line: string) => undefined
  readonly warned: (line: string) => undefined
}

export type QueuedIn = (parts: ServingParts) => (turn: MessageTurn) => Promise<Response>

export type ServingSurface = {
  readonly listened: (spec: ListenSpec) => Listening
  readonly socketCleared: (path: string) => undefined
  readonly socketRemoved: (path: string) => undefined
  readonly now: () => number
  readonly slept: (ms: number) => Promise<undefined>
  readonly said: (line: string) => undefined
  readonly warned: (line: string) => undefined
  readonly threw: (line: string, thrown: unknown) => undefined
  readonly logAt?: TransportLogAt | undefined
  readonly fetched?: IdleFetch | undefined
  readonly timers?: IdleTimers | undefined
}

export type ServingDoors = ServingSurface & { readonly queuedIn?: QueuedIn | undefined }

export function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export function requestLine(logPrefix: string, req: Request, pathname: string): string {
  const auth = req.headers.has("authorization") ? "yes" : "no"
  return `${logPrefix} req ${req.method} ${pathname} auth=${auth}`
}

function listeningOf(server: Server<undefined>): Listening {
  return {
    port: server.port,
    stop: (): undefined => {
      server.stop()
    },
    timeout: (req, seconds): undefined => {
      server.timeout(req, seconds)
    },
  }
}

export function listenedOn(spec: ListenSpec): Listening {
  const answered = spec.answered
  const fetch = (req: Request, server: Server<undefined>): Promise<Response> =>
    answered(req, listeningOf(server))
  const server =
    "unix" in spec ? Bun.serve({ unix: spec.unix, fetch }) : Bun.serve({ port: spec.port, fetch })
  return listeningOf(server)
}

export const SURFACE: ServingSurface = {
  listened: listenedOn,
  socketCleared: (path): undefined => {
    mkdirSync(dirname(path), { recursive: true })
    rmSync(path, { force: true })
  },
  socketRemoved: (path): undefined => {
    rmSync(path, { force: true })
  },
  now: () => Date.now(),
  slept: (ms) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(undefined), ms)
    }),
  said: (line) => {
    console.log(line)
  },
  warned: (line) => {
    console.error(line)
  },
  threw: (line, thrown) => {
    console.error(line, thrown)
  },
}

export function walkSeamsOf(parts: ServingParts): AccountWalkSeams {
  const { logPrefix, oauth } = parts
  const getFreshToken = freshCredentialIn({
    logPrefix,
    credentialByAccount: (account, prefix) => oauth.getCredentialByAccount(account, prefix),
    now: parts.now,
    warned: parts.warned,
  })
  return {
    logPrefix,
    pickAccount: buildAccountPicker(logPrefix, oauth, { said: parts.said }),
    getFreshToken,
    forward: parts.forward,
    markAtLimit: async (given): Promise<undefined> => {
      await oauth.markAccountAtLimit(given)
    },
    markDisabled: async (account, reason, prefix): Promise<undefined> => {
      await oauth.markAccountSubscriptionDisabled(account, reason, prefix)
    },
    clearDisabled: async (account, prefix): Promise<undefined> => {
      await oauth.clearAccountSubscriptionDisabled(account, prefix)
    },
    repollAfterLimit: async (account): Promise<undefined> => {
      await oauth.repollUsageAfter429(account, getFreshToken, logPrefix)
    },
  }
}

export function queuedIn(parts: ServingParts): (turn: MessageTurn) => Promise<Response> {
  const { logPrefix, oauth, holds, logAt, now, slept, said } = parts
  const seams = walkSeamsOf(parts)
  return function queued(turn) {
    const attempted = (): Promise<QueueOutcome> => runAccountWalk({ ...turn, seams })
    return runPreForwardQueue({
      logPrefix,
      method: turn.method,
      pathname: turn.pathname,
      originalBody: turn.originalBody,
      doors: {
        attempted,
        committed: (emptyPoolReason) =>
          buildCommittedKeepaliveResponse({
            observerSlot: turn.observerSlot,
            method: turn.method,
            pathname: turn.pathname,
            logPrefix,
            attempted,
            slept,
            now,
            holdRegistry: holds,
            logAt,
            emptyPoolReason,
          }),
        rateLimited: rateLimitResponse,
        pacing: () => oauth.getClaudeAccountPacing(),
        slept,
        now,
        said,
      },
    })
  }
}

export function startOAuthProxy(opts: StartOAuthProxyOptions, doors: ServingDoors): OAuthProxy {
  const logPrefix = opts.logPrefix ?? DEFAULT_LOG_PREFIX
  const oauth = opts.oauth ?? oauthEffectsIn(opts.root)
  const shutdownRegistry = buildShutdownFlushRegistry(doors.now)
  const inFlight = buildInFlightTracker()
  const rcConn = buildInFlightTracker()
  const holds = buildHoldRegistry()

  const forward = buildForward({
    idleTimeoutMs: opts.upstreamIdleTimeoutMs ?? 0,
    downstreamKeepaliveMs: opts.downstreamKeepaliveMs ?? 0,
    logPrefix,
    logAt: doors.logAt,
    shutdownRegistry,
    now: doors.now,
    timers: doors.timers,
    fetchImpl: doors.fetched,
  })

  const pipeline = doors.queuedIn ?? queuedIn

  const handleMessages = buildMessageHandler(logPrefix, {
    queued: pipeline({
      logPrefix,
      oauth,
      forward,
      holds,
      logAt: doors.logAt,
      now: doors.now,
      slept: doors.slept,
      said: doors.said,
      warned: doors.warned,
    }),
    said: doors.said,
    threw: doors.threw,
  })

  async function messaged(req: Request, listening: Listening): Promise<Response> {
    listening.timeout(req, NO_TIMEOUT)
    inFlight.begin()
    const ended = buildEndInFlightOnce(inFlight.end)
    const slot: ObserverSlot = { current: null, endInFlight: ended }
    req.signal.addEventListener("abort", () => {
      slot.current?.onClientDisconnect?.(CLIENT_ABORT, doors.now())
      ended()
    })
    let handedOff = false
    try {
      const res = await handleMessages(req, slot)
      if (res.body !== null && slot.current !== null) {
        slot.current.armTerminal(ended)
        handedOff = true
      }
      return res
    } finally {
      if (!handedOff) {
        slot.current?.onClientDisconnect?.(HANDLER_EXIT, doors.now())
        slot.current = null
        ended()
      }
    }
  }

  async function relayed(req: Request, remoteControl: boolean): Promise<Response> {
    const body = req.body === null ? null : await req.arrayBuffer()
    if (!remoteControl) return forward(req, null, body, null, { current: null })
    rcConn.begin()
    const ended = buildEndInFlightOnce(rcConn.end)
    const slot: ObserverSlot = { current: null, endInFlight: ended }
    req.signal.addEventListener("abort", ended)
    let handedOff = false
    try {
      const res = await forward(req, null, body, null, slot)
      if (res.body !== null && slot.current !== null) {
        slot.current.armTerminal(ended)
        handedOff = true
      }
      return res
    } finally {
      if (!handedOff) ended()
    }
  }

  function answering(remoteControl: boolean): Answering {
    return async function answered(req, listening) {
      const url = new URL(req.url)
      doors.said(requestLine(logPrefix, req, url.pathname))
      if (req.method === "HEAD" && url.pathname === ROOT_PATH) {
        return new Response(null, { status: OK })
      }
      if (req.method === "GET" && url.pathname === HEALTH_PATH) {
        return new Response(OK_BODY, { status: OK })
      }
      if (req.method === "GET" && url.pathname === IN_FLIGHT_PATH) {
        return Response.json({ inFlight: inFlight.getCount(), ...holds.snapshot(doors.now()) })
      }
      if (req.method === "GET" && url.pathname === RC_STATUS_PATH) {
        return Response.json({ rcConnections: rcConn.getCount() })
      }
      if (req.method === "POST" && MESSAGES_PATHS.has(url.pathname)) {
        return messaged(req, listening)
      }
      return relayed(req, remoteControl)
    }
  }

  const listening = bindWithRetry(opts.port, logPrefix, () =>
    doors.listened({ port: opts.port, answered: answering(false) })
  )
  const port = listening.port
  if (port === undefined) {
    listening.stop()
    throw new Error(`${logPrefix} the listener answered no port`)
  }

  const socketPath = opts.unixSocketPath ?? null
  let socket: Listening | null = null
  if (socketPath !== null) {
    try {
      doors.socketCleared(socketPath)
      socket = doors.listened({ unix: socketPath, answered: answering(true) })
      doors.warned(`${logPrefix} remote-control unix socket listening at ${socketPath}`)
    } catch (thrown) {
      socket = null
      doors.warned(
        `${logPrefix} remote-control unix bind failed (TCP unaffected): ${sayOf(thrown)}`
      )
    }
  }
  doors.warned(`${logPrefix} listening on http://localhost:${port}`)

  return {
    port,
    stop: (): undefined => {
      listening.stop()
      if (socket === null || socketPath === null) return
      try {
        socket.stop()
      } finally {
        doors.socketRemoved(socketPath)
      }
    },
    flushAll: (reason): undefined => {
      shutdownRegistry.flushAll(reason)
    },
  }
}
