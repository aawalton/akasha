import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { inventoryPath } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { visit as visitArgument } from "akasha/commands/arguments/pages/visit.argument.ts"
import {
  asJson,
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { numSaid } from "akasha/commands/modules/inventory-trace-saying/inventory-trace-saying.module.code.ts"
import { temperInventoryBankTrace as page } from "akasha/commands/pages/temper/inventory/bank/trace/temper-inventory-bank-trace.command.ts"
import type {
  BankTrace,
  BankTracePacedDispatch as PacedDispatch,
} from "akasha/temper/commands/modules/bank-trace-reading/bank-trace-reading.module.code.ts"
import { readBankTraces } from "akasha/temper/commands/modules/bank-trace-reading/bank-trace-reading.module.code.ts"
import {
  handlerSaid,
  msSaid,
  settlingSaid,
  stackingSaid,
} from "akasha/temper/commands/modules/venue-trace-saying/venue-trace-saying.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const INVENTORY_LUA = "TemperInventory.lua"

const NAMED = [visitArgument, json, inventoryPath]

function pacedSaid(paced: PacedDispatch | undefined): string {
  if (paced === undefined) return "paced dispatch: nil (pre-wave-3 trace or vault path)"
  const aborted = paced.abortedEarly ? " ABORTED-EARLY" : ""
  return (
    `paced dispatch: planned=${paced.planned} issued=${paced.issued} ` +
    `confirmed=${paced.confirmed} retries=${paced.retries} span=${paced.spanMs}ms${aborted}`
  )
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
    pacedSaid(trace.pacedDispatch),
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
