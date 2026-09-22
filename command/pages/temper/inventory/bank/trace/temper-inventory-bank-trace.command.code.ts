import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { inventoryPath } from "akasha/command/argument/pages/inventory-path.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { visit as visitArgument } from "akasha/command/argument/pages/visit.argument.ts"
import {
  asJson,
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { numSaid } from "akasha/command/modules/inventory-trace-saying/inventory-trace-saying.module.code.ts"
import { temperInventoryBankTrace as page } from "akasha/command/pages/temper/inventory/bank/trace/temper-inventory-bank-trace.command.ts"
import type {
  BankTrace,
  BankTracePacedDispatch as PacedDispatch,
  BankTracePacedMove as PacedMove,
} from "akasha/temper/command/modules/bank-trace-reading/bank-trace-reading.module.code.ts"
import { readBankTraces } from "akasha/temper/command/modules/bank-trace-reading/bank-trace-reading.module.code.ts"
import {
  handlerSaid,
  msSaid,
  settlingSaid,
  stackingSaid,
} from "akasha/temper/command/modules/venue-trace-saying/venue-trace-saying.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const INVENTORY_LUA = "TemperItems.lua"

const NAMED = [visitArgument, json, inventoryPath]

function moveSaid(one: PacedMove): string {
  const landed = one.stackAtIssue - one.stackNow
  const source =
    landed === 0
      ? `source ${one.stackAtIssue} unmoved`
      : `source ${one.stackAtIssue}→${one.stackNow} (${landed} landed)`
  const target =
    one.targetStack === undefined || one.targetMax === undefined
      ? "target unread"
      : `target ${one.targetStack}/${one.targetMax} (room ${one.targetMax - one.targetStack})`
  return (
    `bag${one.sourceBag} slot${one.sourceSlot} → bag${one.targetBag} slot${one.targetSlot} ` +
    `x${one.count} item ${one.itemId}, attempt ${one.attempts}, ${source}, ${target}`
  )
}

function movesSaid(moves: readonly PacedMove[] | undefined): readonly string[] {
  if (moves === undefined) return []
  return moves.map((one) => `    ${moveSaid(one)}`)
}

function abandonedSaid(moves: readonly PacedMove[] | undefined): readonly string[] {
  if (moves === undefined || moves.length === 0) return []
  return [`  still in flight when the bank closed: ${moves.length}`, ...movesSaid(moves)]
}

function pacedSaid(paced: PacedDispatch | undefined): readonly string[] {
  if (paced === undefined) return ["paced dispatch: nil (pre-wave-3 trace or vault path)"]
  const aborted = paced.abortedEarly ? " ABORTED-EARLY" : ""
  const head =
    `paced dispatch: planned=${paced.planned} issued=${paced.issued} ` +
    `confirmed=${paced.confirmed} retries=${paced.retries} span=${paced.spanMs}ms${aborted}`
  const rounds = paced.rounds
  if (rounds === undefined) return [head, "  rounds: nil (pre-v9 trace)"]
  if (rounds.length === 0) return [head, "  rounds: none — the batch never settled"]
  const unnamed =
    rounds[0]?.unconfirmed === undefined
      ? ["  (pre-v10 trace — bank once more to be told which moves went unconfirmed)"]
      : []
  return [
    head,
    ...unnamed,
    ...rounds.flatMap((one, index) => [
      `  round ${index + 1} at ${one.elapsedMs}ms: ` +
        `confirmed ${one.confirmed}, retried ${one.retried}, left ${one.left}`,
      ...movesSaid(one.unconfirmed),
    ]),
    ...abandonedSaid(paced.abandoned),
  ]
}

function traceSaid(trace: BankTrace): readonly string[] {
  return [
    `[bank trace @ ${trace.timestamp}] bag=${trace.bankingBag} ` +
      `open-handler=${msSaid(trace.openHandlerMs)} open→close=${msSaid(trace.openToCloseMs)}`,
    `phases: scanBankBags=${msSaid(trace.scanBankBagsMs)} ` +
      `refreshPanel=${msSaid(trace.refreshPanelMs)} ` +
      `withdraw=${msSaid(trace.withdrawMs)} deposit=${msSaid(trace.depositMs)}`,
    `moves: ${numSaid(trace.moveCount)} (withdraw ${numSaid(trace.withdrawCount)}, ` +
      `deposit ${numSaid(trace.depositCount)})`,
    ...pacedSaid(trace.pacedDispatch),
    stackingSaid(trace.stacking),
    `net-worth walks: ${trace.netWorth.walkCount}, total ${trace.netWorth.walkTotalMs}ms, ` +
      `max ${trace.netWorth.walkMaxMs}ms`,
    ...handlerSaid(trace.handler),
    ...settlingSaid(trace.settling),
  ]
}

function visitsSaid(traces: readonly BankTrace[], back: number): string {
  const each = traces.map((one, index) => {
    const mark = index + 1 === back ? "*" : ""
    return `${index + 1}${mark} @${one.timestamp} bag=${one.bankingBag}`
  })
  return `visits kept, most recent first: ${each.join("  ")}`
}

export async function temperInventoryBankTrace(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  const at =
    taken.inventoryPath === undefined
      ? savedVarsFile(INVENTORY_LUA)
      : resolve(given.root, taken.inventoryPath)
  let traces: readonly BankTrace[]
  try {
    traces = await readBankTraces(at)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  const back = taken.visit
  if (back < 1 || back > traces.length) {
    return refused(
      `the file keeps visits 1 to ${traces.length}, ` +
        `and \`${visitArgument.said} ${back}\` is none of them`,
      INPUT
    )
  }
  const chosen = traces[back - 1] as BankTrace
  if (taken.json) return asJson(chosen)
  return told([visitsSaid(traces, back), ...traceSaid(chosen)])
}
