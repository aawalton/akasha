import type { OAuthCredential } from "akasha/agent/model/account/modules/oauth-types/oauth-types.module.code.ts"
import {
  type Answering,
  type Listening,
  type ListenSpec,
  type QueuedIn,
  type ServingDoors,
  type ServingParts,
  startOAuthProxy,
} from "akasha/agent/model/gateway/modules/gateway-serving/gateway-serving.module.code.ts"
import type { StartOAuthProxyOptions } from "akasha/agent/model/gateway/modules/gateway-start/gateway-start.module.code.ts"
import type {
  IdleFetch,
  IdleTimers,
} from "akasha/agent/model/gateway/modules/idle-timeout/idle-timeout.module.code.ts"
import type { MessageTurn } from "akasha/agent/model/gateway/modules/message-handler/message-handler.module.code.ts"
import type { OAuthEffects } from "akasha/agent/model/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import type { ArmableStreamObserver } from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.code.ts"
import { keptLog } from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.test-fixtures.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const ROOT = "/var/tmp/proxy-serving-root"

export const PORT = 4321

export const SOCKET_PATH = "/var/tmp/proxy-serving-root/rc.sock"

const AT = "http://localhost:4321"

const NOW = 1_700_000_000_000

export const STUB_OAUTH: OAuthEffects = {
  getBestCredential: async () => null,
  getCredentialByAccount: async () => null,
  markAccountAtLimit: async () => undefined,
  repollUsageAfter429: async () => undefined,
  getModelAccountPacing: async () => new Map(),
  markAccountSubscriptionDisabled: async () => undefined,
  clearAccountSubscriptionDisabled: async () => undefined,
}

export const POOLED_TOKEN = "invented-pool-token"

const A_DAY = 86_400_000

const POOLED: OAuthCredential = {
  account: "invented-account",
  accessToken: POOLED_TOKEN,
  refreshToken: "invented-refresh",
  expiresAt: NOW + A_DAY,
  scopes: [],
  subscriptionType: null,
  rateLimitTier: null,
}

export const POOLED_OAUTH: OAuthEffects = {
  ...STUB_OAUTH,
  getBestCredential: async () => ({ credential: POOLED, fiveHourResetsAtMs: null }),
  getCredentialByAccount: async () => POOLED,
}

const STILL_TIMERS: IdleTimers = {
  set: () => setTimeout(() => undefined, 0),
  clear: () => undefined,
}

export type Sent = { readonly url: string; readonly init: RequestInit }

export type Opened = { readonly spec: ListenSpec; readonly listening: Listening }

export type Thrown = { readonly line: string; readonly error: unknown }

export type Timed = { readonly req: Request; readonly seconds: number }

export type Held = {
  readonly observer: ArmableStreamObserver
  readonly armed: () => readonly (() => void)[]
  readonly disconnects: () => readonly string[]
  readonly shutdowns: () => readonly string[]
}

export function heldObserver(): Held {
  const armed: (() => void)[] = []
  const disconnects: string[] = []
  const shutdowns: string[] = []
  return {
    observer: {
      onChunk: () => undefined,
      onComplete: () => undefined,
      onUpstreamError: () => undefined,
      onDownstreamCancel: () => undefined,
      onClientDisconnect: (reason) => {
        disconnects.push(reason)
      },
      onProxyShutdown: (reason) => {
        shutdowns.push(reason)
      },
      armTerminal: (fn): undefined => {
        armed.push(fn)
      },
    },
    armed: () => armed,
    disconnects: () => disconnects,
    shutdowns: () => shutdowns,
  }
}

export type RigGiven = {
  readonly answered?: (turn: MessageTurn) => Promise<Response>
  readonly named?: boolean
  readonly noPort?: boolean
  readonly openRefused?: boolean
  readonly stopRefused?: boolean
  readonly bindRefusals?: number
  readonly upstream?: () => Response
  readonly clock?: () => number
}

export type Rig = {
  readonly doors: ServingDoors
  readonly opened: readonly Opened[]
  readonly lines: readonly string[]
  readonly warnings: readonly string[]
  readonly thrown: readonly Thrown[]
  readonly cleared: readonly string[]
  readonly removed: readonly string[]
  readonly stopped: readonly number[]
  readonly timeouts: readonly Timed[]
  readonly naps: readonly number[]
  readonly parts: readonly ServingParts[]
  readonly turns: readonly MessageTurn[]
  readonly sent: readonly Sent[]
  readonly asked: () => number
  readonly answering: (at: number) => Answering
  readonly listening: (at: number) => Listening
}

function addrInUse(): Error {
  return Object.assign(new Error("listen EADDRINUSE"), { code: "EADDRINUSE" })
}

export function rigged(given: RigGiven = {}): Rig {
  const opened: Opened[] = []
  const lines: string[] = []
  const warnings: string[] = []
  const thrown: Thrown[] = []
  const cleared: string[] = []
  const removed: string[] = []
  const stopped: number[] = []
  const timeouts: Timed[] = []
  const naps: number[] = []
  const parts: ServingParts[] = []
  const turns: MessageTurn[] = []
  const sent: Sent[] = []
  let asked = 0
  let refusalsLeft = given.bindRefusals ?? 0

  const fetched: IdleFetch = (url, init) => {
    sent.push({ url, init })
    return Promise.resolve(given.upstream?.() ?? new Response("upstream", { status: 200 }))
  }

  const watched: QueuedIn = (built) => {
    parts.push(built)
    return async (turn) => {
      turns.push(turn)
      if (given.answered !== undefined) return given.answered(turn)
      return new Response(null, { status: 204 })
    }
  }

  const doors: ServingDoors = {
    listened: (spec) => {
      if ("unix" in spec && given.openRefused === true) throw new Error("unix bind refused")
      if (!("unix" in spec) && refusalsLeft > 0) {
        refusalsLeft -= 1
        throw addrInUse()
      }
      const at = opened.length
      const unix = "unix" in spec
      const listening: Listening = {
        port: unix || given.noPort === true ? undefined : PORT,
        stop: (): undefined => {
          stopped.push(at)
          if (unix && given.stopRefused === true) throw new Error("stop refused")
        },
        timeout: (req, seconds): undefined => {
          timeouts.push({ req, seconds })
        },
      }
      opened.push({ spec, listening })
      return listening
    },
    socketCleared: (path): undefined => {
      cleared.push(path)
    },
    socketRemoved: (path): undefined => {
      removed.push(path)
    },
    now: () => {
      asked += 1
      return given.clock?.() ?? NOW
    },
    slept: async (ms) => {
      naps.push(ms)
      return undefined
    },
    said: (line) => {
      lines.push(line)
    },
    warned: (line) => {
      warnings.push(line)
    },
    threw: (line, error) => {
      thrown.push({ line, error })
    },
    fetched,
    timers: STILL_TIMERS,
    queuedIn: given.named === true ? undefined : watched,
  }

  return {
    doors,
    opened,
    lines,
    warnings,
    thrown,
    cleared,
    removed,
    stopped,
    timeouts,
    naps,
    parts,
    turns,
    sent,
    asked: () => asked,
    answering: (at) => {
      const held = opened[at]
      if (held === undefined) throw new Error(`no listener was opened at ${at}`)
      return held.spec.answered
    },
    listening: (at) => {
      const held = opened[at]
      if (held === undefined) throw new Error(`no listener was opened at ${at}`)
      return held.listening
    },
  }
}

export function optionsOf(extra: Partial<StartOAuthProxyOptions> = {}): StartOAuthProxyOptions {
  return { port: PORT, root: ROOT, oauth: STUB_OAUTH, ...extra }
}

export function startedProxy(
  given: RigGiven = {},
  extra: Partial<StartOAuthProxyOptions> = {}
): Rig {
  const rig = rigged(given)
  startOAuthProxy(optionsOf(extra), rig.doors)
  return rig
}

export function requested(path: string, init: RequestInit = {}): Request {
  return new Request(`${AT}${path}`, init)
}

export type Reached = { readonly pipeline: boolean; readonly rows: number }

export async function transportLogReached(): Promise<Reached> {
  const kept = keptLog()
  const rig = startedProxy({}, { transportLog: kept.log })
  const res = await rig.answering(0)(requested("/v1/models"), rig.listening(0))
  await res.text()
  return { pipeline: rig.parts[0]?.transportLog === kept.log, rows: kept.rows.length }
}

export async function relayedAuthorization(
  oauth: OAuthEffects,
  init: RequestInit = {}
): Promise<string | null> {
  const rig = startedProxy({}, { oauth })
  await rig.answering(0)(requested("/api/claude_code/policy_limits", init), rig.listening(0))
  const headers = rig.sent[0]?.init.headers
  return headers instanceof Headers ? headers.get("authorization") : null
}

export type Gate = {
  readonly waited: Promise<Response>
  readonly open: (res: Response) => undefined
}

export function gated(): Gate {
  let opened: (res: Response) => undefined = () => undefined
  const waited = new Promise<Response>((resolve) => {
    opened = (res): undefined => {
      resolve(res)
    }
  })
  return { waited, open: (res) => opened(res) }
}

export function ticked(): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 0)
  })
}

async function readingOf(rig: Rig, path: string): Promise<unknown> {
  const res = await rig.answering(0)(requested(path), rig.listening(0))
  return await res.json()
}

export function snapshotOf(rig: Rig): Promise<unknown> {
  return readingOf(rig, "/inflight")
}

export async function inFlightOf(rig: Rig): Promise<unknown> {
  const held = await snapshotOf(rig)
  return held instanceof Object && "inFlight" in held ? held.inFlight : null
}

export async function rcOf(rig: Rig): Promise<unknown> {
  const held = await readingOf(rig, "/rc-status")
  return held instanceof Object && "rcConnections" in held ? held.rcConnections : null
}

export type Streamed = {
  readonly upstream: () => Response
  readonly close: () => undefined
}

export function streamedUpstream(): Streamed {
  let held: ReadableStreamDefaultController<Uint8Array> | null = null
  const stream = new ReadableStream<Uint8Array>({
    start: (given) => {
      held = given
      given.enqueue(new TextEncoder().encode("first"))
    },
  })
  return {
    upstream: () => new Response(stream, { status: 200 }),
    close: (): undefined => {
      held?.close()
    },
  }
}

export type Aborted = {
  readonly disconnect: string | undefined
  readonly inFlight: unknown
}

export async function abortedTurn(): Promise<Aborted> {
  const held = heldObserver()
  const gate = gated()
  const control = new AbortController()
  const rig = rigged({
    answered: (turn) => {
      turn.observerSlot.current = held.observer
      return gate.waited
    },
  })
  startOAuthProxy(optionsOf(), rig.doors)
  const init = { method: "POST", body: "{}", signal: control.signal }
  const serving = rig.answering(0)(requested("/v1/messages", init), rig.listening(0))
  await ticked()
  control.abort()
  const said = { disconnect: held.disconnects()[0], inFlight: await inFlightOf(rig) }
  gate.open(new Response(null, { status: 204 }))
  await serving
  return said
}

export async function endedTwice(): Promise<unknown> {
  const held = heldObserver()
  const control = new AbortController()
  const rig = rigged({
    answered: async (turn) => {
      turn.observerSlot.current = held.observer
      control.abort()
      return new Response(null, { status: 204 })
    },
  })
  startOAuthProxy(optionsOf(), rig.doors)
  const init = { method: "POST", body: "{}", signal: control.signal }
  await rig.answering(0)(requested("/v1/messages", init), rig.listening(0))
  return inFlightOf(rig)
}

export type Failed = {
  readonly status: number
  readonly armed: number
  readonly disconnects: readonly string[]
  readonly inFlight: unknown
}

export async function failedTurn(): Promise<Failed> {
  const held = heldObserver()
  const rig = rigged({
    answered: (turn) => {
      turn.observerSlot.current = held.observer
      return Promise.reject(new Error("the turn ceiling is reached"))
    },
  })
  startOAuthProxy(optionsOf(), rig.doors)
  const init = { method: "POST", body: "{}" }
  const res = await rig.answering(0)(requested("/v1/messages", init), rig.listening(0))
  const armed = held.armed().length
  return {
    status: res.status,
    armed,
    disconnects: held.disconnects(),
    inFlight: await inFlightOf(rig),
  }
}

const OWN = "a70d67f8ee96115ae"

export type StoppedTurn = {
  readonly status: number
  readonly turns: number
  readonly line: string | undefined
}

export async function stoppedTurn(named: boolean): Promise<StoppedTurn> {
  const rig = startedProxy({}, { stopped: { has: (own) => own === OWN } })
  const headers: Record<string, string> = named ? { "x-claude-code-agent-id": OWN } : {}
  const req = requested("/v1/messages", { method: "POST", body: "{}", headers })
  const res = await rig.answering(0)(req, rig.listening(0))
  return { status: res.status, turns: rig.turns.length, line: rig.lines[1] }
}
