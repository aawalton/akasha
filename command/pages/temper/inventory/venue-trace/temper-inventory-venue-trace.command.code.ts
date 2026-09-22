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
import { temperInventoryVenueTrace as page } from "akasha/command/pages/temper/inventory/venue-trace/temper-inventory-venue-trace.command.ts"
import type { BankTrace } from "akasha/temper/command/modules/bank-trace-reading/bank-trace-reading.module.code.ts"
import { readVenueTraces } from "akasha/temper/command/modules/bank-trace-reading/bank-trace-reading.module.code.ts"
import {
  handlerSaid,
  msSaid,
  settlingSaid,
} from "akasha/temper/command/modules/venue-trace-saying/venue-trace-saying.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const INVENTORY_LUA = "TemperItems.lua"

const NAMED = [visitArgument, json, inventoryPath]

const NONE_YET =
  "no diagnostics.storeTraces in this file yet — " +
  "talk to a merchant or a fence, then /reloadui, then run this again"

function venueSaid(trace: BankTrace): string {
  return trace.venue ?? "unnamed"
}

function traceSaid(trace: BankTrace): readonly string[] {
  return [
    `[venue trace @ ${trace.timestamp}] venue=${venueSaid(trace)} ` +
      `open-handler=${msSaid(trace.openHandlerMs)} open→close=${msSaid(trace.openToCloseMs)}`,
    `net-worth walks: ${trace.netWorth.walkCount}, total ${trace.netWorth.walkTotalMs}ms, ` +
      `max ${trace.netWorth.walkMaxMs}ms`,
    ...handlerSaid(trace.handler),
    ...settlingSaid(trace.settling),
  ]
}

function visitsSaid(traces: readonly BankTrace[], back: number): string {
  const each = traces.map((one, index) => {
    const mark = index + 1 === back ? "*" : ""
    return `${index + 1}${mark} @${one.timestamp} ${venueSaid(one)}`
  })
  return `visits kept, most recent first: ${each.join("  ")}`
}

export async function temperInventoryVenueTrace(
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
    traces = await readVenueTraces(at)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if (traces.length === 0) return told([NONE_YET])
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
