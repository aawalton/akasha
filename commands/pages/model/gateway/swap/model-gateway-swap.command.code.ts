import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { fleet } from "akasha/commands/arguments/pages/fleet.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { seat } from "akasha/commands/arguments/pages/seat.argument.ts"
import {
  answering,
  INPUT,
  naming,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { liveSeats } from "akasha/commands/pages/model/gateway/live-gateway-seats/live-gateway-seats.module.code.ts"
import { modelGatewaySwap as page } from "akasha/commands/pages/model/gateway/swap/model-gateway-swap.command.ts"
import {
  describeAckTimeout,
  setRequestedAction,
  waitForActionCleared,
} from "akasha/seat-system/seat-action/seat-action.module.code.ts"
import type { SeatMatch } from "akasha/seat-system/seat-handle/seat-handle.module.code.ts"
import { resolveSeatTarget } from "akasha/seat-system/seat-handle/seat-handle.module.code.ts"
import { readProxyState } from "akasha/seat-system/seat-proxy-state/seat-proxy-state.module.code.ts"
import { pidAliveOrRefuse } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"

const ACTION = "swap-proxy"

const STAGGER_MS = 1_000

const ACK_TIMEOUT_MS = 30_000

export type Taken = {
  readonly seat?: string
  readonly fleet: boolean
  readonly json: boolean
}

export function wrongIn(read: Taken): readonly string[] {
  if (read.seat !== undefined || read.fleet) return []
  return [`a swap names a seat or says \`${fleet.said}\`, and no seat was named`]
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

export type Seams = {
  readonly asking: Asking
  readonly found: (target: string) => SeatMatch
  readonly liveIds: () => readonly string[]
}

export const SWAP_SEAMS: Seams = {
  asking: swapped,
  found: (target) => resolveSeatTarget(target),
  liveIds: () => liveSeats().map((one) => one.agentId),
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

async function fleeting(asJson: boolean, done: string[], seams: Seams): Promise<Answer> {
  const report: string[] = []
  const held = await askedEach(seams.liveIds(), seams.asking, report, done)
  const timedOut = held.filter((one) => one.status === "timeout")
  if (asJson) {
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

async function swapping(read: Taken, done: string[], seams: Seams): Promise<Answer> {
  if (read.fleet) return await fleeting(read.json, done, seams)
  const report: string[] = []
  const found = seams.found(read.seat ?? "")
  if ("error" in found) return refused(found.error, INPUT)
  const status = await seams.asking(found.id, done)
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
  if (read.json) {
    report.push(JSON.stringify({ ok: true, agentId: found.id, status }))
  } else {
    report.push(`${status}\t${found.id}`)
  }
  return { report, refusals: [], code: OK }
}

export function swappedBy(read: Taken, seams: Seams): Promise<Answer> {
  return answering(async (done) => naming(done, await swapping(read, done, seams)))
}

export async function modelGatewaySwap(
  argv: readonly string[],
  given: Given,
  seams: Seams = SWAP_SEAMS
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json, seat, fleet])
  if ("refused" in read) return { report: [], refusals: [...read.refused], code: INPUT }
  const wrong = wrongIn(read.taken)
  if (wrong.length > 0) return { report: [], refusals: wrong, code: INPUT }
  return await swappedBy(read.taken, seams)
}
