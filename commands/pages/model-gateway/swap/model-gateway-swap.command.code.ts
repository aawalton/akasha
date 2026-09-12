import {
  codeOf,
  INPUT,
  OK,
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { liveSeats } from "akasha/commands/pages/model-gateway/live-gateway-seats/live-gateway-seats.module.code.ts"
import {
  describeAckTimeout,
  setRequestedAction,
  waitForActionCleared,
} from "akasha/seat-system/seat-action/seat-action.module.code.ts"
import { resolveSeatTarget } from "akasha/seat-system/seat-handle/seat-handle.module.code.ts"
import { readProxyState } from "akasha/seat-system/seat-proxy-state/seat-proxy-state.module.code.ts"
import { pidAliveOrRefuse } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

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
        const said = namesDrawn(TAKES)
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

export type Outcome = "swapped" | "no-live-proxy" | "timeout"

export type Held = { readonly agentId: string; readonly status: Outcome }

export function askedSaid(agentId: string): string {
  return `${agentId} holds the ask to swap its gateway, so that gateway swaps whatever follows`
}

export type Asking = (agentId: string, done: string[]) => Promise<Outcome>

async function swapped(agentId: string, done: string[]): Promise<Outcome> {
  const state = readProxyState(agentId)
  if (state == null || !pidAliveOrRefuse(state.pid)) return "no-live-proxy"
  await setRequestedAction(agentId, { action: ACTION })
  done.push(askedSaid(agentId))
  const said = await waitForActionCleared(agentId)
  return said.ok ? "swapped" : "timeout"
}

function waiting(ms: number): Promise<void> {
  return new Promise((done) => setTimeout(done, ms))
}

export async function askedEach(
  seats: readonly string[],
  asking: Asking,
  report: string[],
  done: string[]
): Promise<readonly Held[]> {
  const held: Held[] = []
  for (const [at, agentId] of seats.entries()) {
    const status = await asking(agentId, done).catch((thrown: unknown): Outcome => {
      report.push(`${agentId} would not answer — ${whyOf(thrown)}`)
      return "timeout"
    })
    held.push({ agentId, status })
    if (at < seats.length - 1) await waiting(STAGGER_MS)
  }
  return held
}

async function fleeting(
  on: ReadonlySet<string>,
  report: string[],
  done: string[],
  asking: Asking
): Promise<Answer> {
  const held = await askedEach(
    liveSeats().map((seat) => seat.agentId),
    asking,
    report,
    done
  )
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
    code: timedOut.length === 0 ? OK : OPERATIONAL,
  }
}

async function swapping(
  read: Taken,
  report: string[],
  done: string[],
  asking: Asking
): Promise<Answer> {
  if (read.on.has(FLEET)) return await fleeting(read.on, report, done, asking)
  const target = read.target ?? ""
  const found = resolveSeatTarget(target)
  if ("error" in found) return refused(found.error, INPUT)
  const status = await asking(found.id, done)
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
      code: OPERATIONAL,
    }
  }
  if (read.on.has(JSON_OUT)) {
    report.push(JSON.stringify({ ok: true, agentId: found.id, status }))
  } else {
    report.push(`${status}\t${found.id}`)
  }
  return { report, refusals: [], code: OK }
}

export async function modelGatewaySwap(
  argv: readonly string[],
  given: Given,
  asking: Asking = swapped
): Promise<Answer> {
  void given
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const report: string[] = []
  const done: string[] = []
  try {
    return await swapping(read, report, done, asking)
  } catch (thrown) {
    return {
      report: [...report, ...done],
      refusals: [whyOf(thrown), ...partWay(done)],
      code: codeOf(thrown),
    }
  }
}
