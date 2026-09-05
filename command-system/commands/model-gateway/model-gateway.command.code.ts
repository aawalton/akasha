import { computeModelGatewayTreeVersion } from "@akasha/agents/gateway-tree-version"
import { type LiveProxySeat, liveProxySeats, seatsNewestFirst } from "@akasha/agents/proxy-seats"
import {
  describeAckTimeout,
  setRequestedAction,
  waitForActionCleared,
} from "@akasha/seat-system/seat-action"
import { planSeatResolution, resolveSeatTarget } from "@akasha/seat-system/seat-handle"
import { readProxyState } from "@akasha/seat-system/seat-proxy-state"
import { seatsPresent } from "@akasha/seat-system/seat-roster"
import { pidAliveOrRefuse } from "@akasha/utils-process/pid-signal"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"

const STATUS = "status"

const SWAP = "swap"

const ACTS = [STATUS, SWAP] as const

const FLEET = "--fleet"

const JSON_OUT = "--json"

const ACTION = "swap-proxy"

const STAGGER_MS = 1_000

const ACK_TIMEOUT_MS = 30_000

const SHORT = 12

const NONE = "—"

const TAKEN: { readonly [act: string]: readonly string[] } = {
  [STATUS]: [JSON_OUT],
  [SWAP]: [FLEET, JSON_OUT],
}

export type Taken = {
  readonly act: string
  readonly target: string | null
  readonly on: ReadonlySet<string>
}

export type Read = Taken | { readonly refused: readonly string[] }

function acts(): string {
  return ACTS.map((one) => `\`${one}\``).join(", ")
}

export function readIn(argv: readonly string[]): Read {
  const [named, ...rest] = argv
  if (named === undefined) {
    return { refused: [`this names no act — it carries ${acts()}`] }
  }
  if (!(ACTS as readonly string[]).includes(named)) {
    return { refused: [`\`${named}\` is no act this carries — it carries ${acts()}`] }
  }
  const takes = TAKEN[named] ?? []
  const refusals: string[] = []
  const on = new Set<string>()
  let target: string | null = null
  for (const one of rest) {
    if (one.startsWith("-")) {
      if (!takes.includes(one)) {
        const said = takes.map((each) => `\`${each}\``).join(", ")
        refusals.push(`\`${one}\` is no flag \`${named}\` takes — it takes ${said}`)
        continue
      }
      on.add(one)
      continue
    }
    if (named !== SWAP) {
      refusals.push(`\`${one}\` follows \`${named}\`, which names no seat`)
      continue
    }
    if (target !== null) {
      refusals.push(`\`${one}\` follows the seat \`${target}\`, and one swap names one seat`)
      continue
    }
    target = one
  }
  if (named === SWAP && target !== null && on.has(FLEET)) {
    refusals.push(
      `\`${SWAP}\` names the seat \`${target}\` and \`${FLEET}\` both, and it takes one`
    )
  }
  if (named === SWAP && target === null && !on.has(FLEET)) {
    refusals.push(`\`${SWAP}\` names a seat or says \`${FLEET}\`, and it said neither`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act: named, target, on }
}

type Drift = "current" | "lagging" | "unknown"

export function driftOf(running: string | null, onDisk: string | null): Drift {
  if (running == null || onDisk == null) return "unknown"
  return running === onDisk ? "current" : "lagging"
}

export function shortOf(version: string | null): string {
  if (version == null || version.length === 0) return NONE
  return version.slice(0, SHORT)
}

function resolveLiveProxySeats(): readonly LiveProxySeat[] {
  const agents = seatsNewestFirst(
    seatsPresent().map((seat) => ({ id: seat.id, name: seat.name, activeAtMs: seat.activeAtMs }))
  )
  return liveProxySeats(agents, readProxyState, pidAliveOrRefuse)
}

function labelOf(seat: LiveProxySeat): string {
  return seat.name ?? seat.agentId.slice(0, 8)
}

function statusing(on: ReadonlySet<string>, report: string[]): Answer {
  const seats = resolveLiveProxySeats()
  const onDisk = computeModelGatewayTreeVersion()
  const rows = seats.map((seat) => ({ seat, drift: driftOf(seat.runningVersion, onDisk) }))
  if (on.has(JSON_OUT)) {
    report.push(
      JSON.stringify({
        ok: true,
        onDiskVersion: onDisk,
        seats: rows.map(({ seat, drift }) => ({
          agentId: seat.agentId,
          name: seat.name,
          status: drift,
          runningVersion: seat.runningVersion,
        })),
      })
    )
    return { report, refusals: [], code: 0 }
  }
  for (const { seat, drift } of rows) {
    report.push(`${labelOf(seat)}\t${drift}\t${shortOf(seat.runningVersion)}\t${shortOf(onDisk)}`)
  }
  return { report, refusals: [], code: 0 }
}

type Outcome = "swapped" | "no-live-proxy" | "timeout"

async function swapped(agentId: string): Promise<Outcome> {
  const state = readProxyState(agentId)
  if (state == null || !pidAliveOrRefuse(state.pid)) return "no-live-proxy"
  await setRequestedAction(agentId, { action: ACTION })
  const said = await waitForActionCleared(agentId)
  return said.ok ? "swapped" : "timeout"
}

function waiting(ms: number): Promise<void> {
  return new Promise((done) => setTimeout(done, ms))
}

async function fleeting(on: ReadonlySet<string>, report: string[]): Promise<Answer> {
  const live = resolveLiveProxySeats()
  const held: { agentId: string; status: Outcome }[] = []
  for (const [at, seat] of live.entries()) {
    const status = await swapped(seat.agentId).catch((thrown: unknown): Outcome => {
      report.push(`${seat.agentId} would not answer — ${whyOf(thrown)}`)
      return "timeout"
    })
    held.push({ agentId: seat.agentId, status })
    if (at < live.length - 1) await waiting(STAGGER_MS)
  }
  const timedOut = held.filter((one) => one.status === "timeout")
  if (on.has(JSON_OUT)) {
    report.push(JSON.stringify({ ok: timedOut.length === 0, seats: held }))
  } else {
    for (const one of held) report.push(`${one.status}\t${one.agentId}`)
  }
  return {
    report,
    refusals: timedOut.map(
      (one) => `${one.agentId} did not take the ask up before the wait ran out`
    ),
    code: timedOut.length === 0 ? 0 : 3,
  }
}

async function swapping(read: Taken, report: string[]): Promise<Answer> {
  if (read.on.has(FLEET)) return await fleeting(read.on, report)
  const target = read.target ?? ""
  const found = resolveSeatTarget(target)
  if ("error" in found) {
    return refused(found.error, planSeatResolution(target).kind === "invalid" ? 1 : 2)
  }
  const status = await swapped(found.id)
  if (status === "timeout") {
    return {
      report,
      refusals: [
        describeAckTimeout(ACTION, {
          agentId: found.id,
          timeoutMs: ACK_TIMEOUT_MS,
          lastRequestedAction: ACTION,
        }),
      ],
      code: 3,
    }
  }
  if (read.on.has(JSON_OUT)) {
    report.push(JSON.stringify({ ok: true, agentId: found.id, status }))
  } else {
    report.push(`${status}\t${found.id}`)
  }
  return { report, refusals: [], code: 0 }
}

export async function modelGateway(argv: readonly string[], given: Given): Promise<Answer> {
  void given
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    if (read.act === STATUS) return statusing(read.on, report)
    return await swapping(read, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
