import {
  describeAckTimeout,
  setRequestedAction,
  waitForActionCleared,
} from "@akasha/seat-system/seat-action"
import { planSeatResolution, resolveSeatTarget } from "@akasha/seat-system/seat-handle"
import { readProxyState } from "@akasha/seat-system/seat-proxy-state"
import { pidAliveOrRefuse } from "@akasha/utils/process/pid-signal"
import { whyOf } from "../../../../command-system/fault-saying/fault-saying.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"
import { liveSeats } from "../status/live-gateway-seats/live-gateway-seats.module.code.ts"

export const FLEET = "--fleet"

export const JSON_OUT = "--json"

const ACTION = "swap-proxy"

const STAGGER_MS = 1_000

const ACK_TIMEOUT_MS = 30_000

const TAKES = [FLEET, JSON_OUT] as const

export type Taken = {
  readonly target: string | null
  readonly on: ReadonlySet<string>
}

export type Read = Taken | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const on = new Set<string>()
  let target: string | null = null
  for (const one of argv) {
    if (one.startsWith("-")) {
      if (!(TAKES as readonly string[]).includes(one)) {
        const said = TAKES.map((each) => `\`${each}\``).join(", ")
        refusals.push(`\`${one}\` is no flag a swap takes — it takes ${said}`)
        continue
      }
      on.add(one)
      continue
    }
    if (target !== null) {
      refusals.push(`\`${one}\` follows the seat \`${target}\`, and one swap names one seat`)
      continue
    }
    target = one
  }
  if (target !== null && on.has(FLEET)) {
    refusals.push(`a swap naming the seat \`${target}\` and \`${FLEET}\` together names one`)
  }
  if (target === null && !on.has(FLEET)) {
    refusals.push(`a swap names a seat or says \`${FLEET}\`, and no seat was named`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { target, on }
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
  const live = liveSeats()
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

export async function modelGatewaySwap(argv: readonly string[], given: Given): Promise<Answer> {
  void given
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    return await swapping(read, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
