import { mkdirSync, rmSync } from "node:fs"
import { dirname } from "node:path"
import {
  buildAccountPicker,
  type PickAccount,
} from "akasha/agent/model/gateway/modules/account-picker/account-picker.module.code.ts"
import {
  type AccountWalkSeams,
  runAccountWalk,
} from "akasha/agent/model/gateway/modules/account-walk/account-walk.module.code.ts"
import { bindWithRetry } from "akasha/agent/model/gateway/modules/bind-with-retry/bind-with-retry.module.code.ts"
import { buildCommittedKeepaliveResponse } from "akasha/agent/model/gateway/modules/committed-keepalive/committed-keepalive.module.code.ts"
import {
  buildForward,
  type Forward,
} from "akasha/agent/model/gateway/modules/forward/forward.module.code.ts"
import {
  type FreshCredential,
  freshCredentialIn,
} from "akasha/agent/model/gateway/modules/fresh-credential/fresh-credential.module.code.ts"
import type {
  OAuthProxy,
  StartOAuthProxyOptions,
} from "akasha/agent/model/gateway/modules/gateway-start/gateway-start.module.code.ts"
import {
  buildHoldRegistry,
  type HoldRegistry,
} from "akasha/agent/model/gateway/modules/hold-registry/hold-registry.module.code.ts"
import type {
  IdleFetch,
  IdleTimers,
} from "akasha/agent/model/gateway/modules/idle-timeout/idle-timeout.module.code.ts"
import { buildInFlightTracker } from "akasha/agent/model/gateway/modules/in-flight/in-flight.module.code.ts"
import {
  buildMessageHandler,
  type MessageTurn,
} from "akasha/agent/model/gateway/modules/message-handler/message-handler.module.code.ts"
import {
  type OAuthEffects,
  oauthEffectsIn,
} from "akasha/agent/model/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import {
  buildEndInFlightOnce,
  type ObserverSlot,
} from "akasha/agent/model/gateway/modules/observer-slot/observer-slot.module.code.ts"
import {
  type QueueOutcome,
  runPreForwardQueue,
} from "akasha/agent/model/gateway/modules/pre-forward-queue/pre-forward-queue.module.code.ts"
import {
  anthropicBaseIn,
  type FallbackRead,
  fallbackReadIn,
} from "akasha/agent/model/gateway/modules/provider-upstream/provider-upstream.module.code.ts"
import { rateLimitResponse } from "akasha/agent/model/gateway/modules/rate-limit-refusal/rate-limit-refusal.module.code.ts"
import {
  NONE_HELD,
  refusalFor,
} from "akasha/agent/model/gateway/modules/subagent-stop-refusal/subagent-stop-refusal.module.code.ts"
import {
  buildShutdownFlushRegistry,
  type TransportLog,
} from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"
import type { Server } from "bun"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const DEFAULT_LOG_PREFIX = "[oauth-proxy]"

const HEALTH_PATH = "/healthz"

const IN_FLIGHT_PATH = "/inflight"

const RC_STATUS_PATH = "/rc-status"

const MESSAGES_PATHS: ReadonlySet<string> = new Set(["/v1/messages", "/v1/messages/count_tokens"])

const ROOT_PATH = "/"

const OK_BODY = "ok"

const OK = 200

const NO_TIMEOUT = 0

const CLIENT_ABORT = "client_abort"

const HANDLER_EXIT = "fetch_handler_exit"

const AUTHORIZATION = "authorization"

const LOOPBACK = "127.0.0.1"

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
  readonly fallback: FallbackRead
  readonly holds: HoldRegistry
  readonly pickAccount: PickAccount
  readonly getFreshToken: FreshCredential
  readonly transportLog: TransportLog | undefined
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
  readonly fetched?: IdleFetch | undefined
  readonly timers?: IdleTimers | undefined
}

export type ServingDoors = ServingSurface & { readonly queuedIn?: QueuedIn | undefined }

function requestLine(logPrefix: string, req: Request, pathname: string): string {
  const auth = req.headers.has(AUTHORIZATION) ? "yes" : "no"
  return `${logPrefix} req ${req.method} ${pathname} auth=${auth}`
}

function stoppedLine(logPrefix: string, pathname: string): string {
  return `${logPrefix} res POST ${pathname} status=400 stopped-subagent`
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

function listenedOn(spec: ListenSpec): Listening {
  const answered = spec.answered
  const fetch = (req: Request, serving: Server<undefined>): Promise<Response> =>
    answered(req, listeningOf(serving))
  const server =
    "unix" in spec
      ? Bun.serve({ unix: spec.unix, fetch })
      : Bun.serve({ hostname: LOOPBACK, port: spec.port, fetch })
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

function walkSeamsOf(parts: ServingParts): AccountWalkSeams {
  const { logPrefix, oauth, pickAccount, getFreshToken } = parts
  return {
    logPrefix,
    pickAccount,
    getFreshToken,
    forward: parts.forward,
    fallback: parts.fallback,
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

function queuedIn(parts: ServingParts): (turn: MessageTurn) => Promise<Response> {
  const { logPrefix, oauth, holds, transportLog, now, slept, said } = parts
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
            transportLog,
            emptyPoolReason,
          }),
        rateLimited: rateLimitResponse,
        pacing: () => oauth.getModelAccountPacing(),
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
  const stopped = opts.stopped ?? NONE_HELD

  const fallback = opts.fallback ?? fallbackReadIn(opts.root, secretsIn)

  const forward = buildForward({
    idleTimeoutMs: opts.upstreamIdleTimeoutMs ?? 0,
    downstreamKeepaliveMs: opts.downstreamKeepaliveMs ?? 0,
    logPrefix,
    base: anthropicBaseIn(opts.root),
    transportLog: opts.transportLog,
    shutdownRegistry,
    now: doors.now,
    timers: doors.timers,
    fetchImpl: doors.fetched,
  })

  const pipeline = doors.queuedIn ?? queuedIn

  const pickAccount = buildAccountPicker(logPrefix, oauth, { said: doors.said })
  const getFreshToken = freshCredentialIn({
    logPrefix,
    credentialByAccount: (account, prefix) => oauth.getCredentialByAccount(account, prefix),
    now: doors.now,
    warned: doors.warned,
  })

  async function relayCredential(): Promise<string | null> {
    const picked = await pickAccount()
    if (picked === null) return null
    const held = await getFreshToken(picked.account)
    return held === null ? null : held.accessToken
  }

  const handleMessages = buildMessageHandler(logPrefix, {
    queued: pipeline({
      logPrefix,
      oauth,
      forward,
      fallback,
      holds,
      pickAccount,
      getFreshToken,
      transportLog: opts.transportLog,
      now: doors.now,
      slept: doors.slept,
      said: doors.said,
      warned: doors.warned,
    }),
    said: doors.said,
    threw: doors.threw,
  })

  async function messaged(req: Request, served: Listening): Promise<Response> {
    served.timeout(req, NO_TIMEOUT)
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
    const token = req.headers.has(AUTHORIZATION) ? null : await relayCredential()
    if (!remoteControl) return forward(req, token, body, null, { current: null })
    rcConn.begin()
    const ended = buildEndInFlightOnce(rcConn.end)
    const slot: ObserverSlot = { current: null, endInFlight: ended }
    req.signal.addEventListener("abort", ended)
    let handedOff = false
    try {
      const res = await forward(req, token, body, null, slot)
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
    return async function answered(req, served) {
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
        const held = refusalFor(req, stopped)
        if (held !== null) {
          doors.said(stoppedLine(logPrefix, url.pathname))
          return held
        }
        return messaged(req, served)
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
        `${logPrefix} remote-control unix bind failed (TCP unaffected): ${saidBy(thrown)}`
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
