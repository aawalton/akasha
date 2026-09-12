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
import { readBankTraces } from "akasha/temper/commands/bank-trace-reading/bank-trace-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const INVENTORY_LUA = "TemperInventory.lua"

const NAMED = [visitArgument, json, inventoryPath]

type Bracket = { readonly count: number; readonly totalMs: number; readonly maxMs: number }

type Settling = {
  readonly evaluateRules: Bracket
  readonly actionsChanged: Bracket
  readonly bankPanelRefresh: Bracket
  readonly slotUpdate?: Bracket
  readonly fullUpdate?: Bracket
  readonly scanCraftBag?: Bracket
  readonly crafting?: { readonly count: number; readonly totalMs: number }
  readonly unattributedMs?: number
}

type PacedDispatch = {
  readonly planned: number
  readonly issued: number
  readonly confirmed: number
  readonly retries: number
  readonly spanMs: number
  readonly abortedEarly: boolean
}

type BankTrace = {
  readonly timestamp: number
  readonly bankingBag: number
  readonly scanBankBagsMs?: number
  readonly refreshPanelMs?: number
  readonly withdrawMs?: number
  readonly depositMs?: number
  readonly withdrawCount?: number
  readonly depositCount?: number
  readonly moveCount?: number
  readonly openHandlerMs?: number
  readonly openToCloseMs?: number
  readonly netWorth: {
    readonly walkCount: number
    readonly walkTotalMs: number
    readonly walkMaxMs: number
  }
  readonly settling?: Settling
  readonly pacedDispatch?: PacedDispatch
}

function ms(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}ms`
}

function bracketSaid(one: Bracket): string {
  return `n=${one.count} total=${one.totalMs}ms max=${one.maxMs}ms`
}

function optBracketSaid(one: Bracket | undefined): string {
  return one === undefined ? "nil (pre-v3 trace)" : bracketSaid(one)
}

function settlingSaid(settling: Settling | undefined): readonly string[] {
  if (settling === undefined) {
    return ["settling: nil (v1 trace — bank once more to capture settling brackets)"]
  }
  const crafting =
    settling.crafting === undefined
      ? "crafting slot-handlers: nil (TemperCrafting absent)"
      : `crafting slot-handlers: n=${settling.crafting.count} total=${settling.crafting.totalMs}ms`
  return [
    `settling: evaluateRules ${bracketSaid(settling.evaluateRules)}; ` +
      `actions-changed ${bracketSaid(settling.actionsChanged)}; ` +
      `bank-panel-refresh ${bracketSaid(settling.bankPanelRefresh)}`,
    `  slot-update ${optBracketSaid(settling.slotUpdate)}; ` +
      `full-update ${optBracketSaid(settling.fullUpdate)}; ` +
      `scan-craft-bag ${optBracketSaid(settling.scanCraftBag)}`,
    crafting,
    `unattributed remainder: ${ms(settling.unattributedMs)}`,
  ]
}

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
      `open-handler=${ms(trace.openHandlerMs)} open→close=${ms(trace.openToCloseMs)}`,
    `phases: scanBankBags=${ms(trace.scanBankBagsMs)} refreshPanel=${ms(trace.refreshPanelMs)} ` +
      `withdraw=${ms(trace.withdrawMs)} deposit=${ms(trace.depositMs)}`,
    `moves: ${numSaid(trace.moveCount)} (withdraw ${numSaid(trace.withdrawCount)}, ` +
      `deposit ${numSaid(trace.depositCount)})`,
    pacedSaid(trace.pacedDispatch),
    `net-worth walks: ${trace.netWorth.walkCount}, total ${trace.netWorth.walkTotalMs}ms, ` +
      `max ${trace.netWorth.walkMaxMs}ms`,
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
    traces = (await readBankTraces(at)) as readonly BankTrace[]
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
