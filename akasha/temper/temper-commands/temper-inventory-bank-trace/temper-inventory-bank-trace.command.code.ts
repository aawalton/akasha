import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { readBankTrace } from "../bank-trace-reading/bank-trace-reading.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const JSON_FLAG = "--json"

const INVENTORY_LUA = "TemperInventory.lua"

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

export type Read =
  | { readonly inventoryPath: string | null; readonly json: boolean }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === INVENTORY_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("--")) {
        refusals.push(`\`${INVENTORY_PATH}\` names the file to read, and no file followed it`)
        continue
      }
      inventoryPath = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\` and \`${JSON_FLAG}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, json }
}

function ms(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}ms`
}

function num(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}`
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

export function traceSaid(trace: BankTrace): readonly string[] {
  return [
    `[bank trace @ ${trace.timestamp}] bag=${trace.bankingBag} ` +
      `open-handler=${ms(trace.openHandlerMs)} open→close=${ms(trace.openToCloseMs)}`,
    `phases: scanBankBags=${ms(trace.scanBankBagsMs)} refreshPanel=${ms(trace.refreshPanelMs)} ` +
      `withdraw=${ms(trace.withdrawMs)} deposit=${ms(trace.depositMs)}`,
    `moves: ${num(trace.moveCount)} (withdraw ${num(trace.withdrawCount)}, ` +
      `deposit ${num(trace.depositCount)})`,
    pacedSaid(trace.pacedDispatch),
    `net-worth walks: ${trace.netWorth.walkCount}, total ${trace.netWorth.walkTotalMs}ms, ` +
      `max ${trace.netWorth.walkMaxMs}ms`,
    ...settlingSaid(trace.settling),
  ]
}

export async function temperInventoryBankTrace(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  try {
    const trace = (await readBankTrace(at)) as BankTrace
    if (read.json) return { report: [JSON.stringify(trace)], refusals: [], code: 0 }
    return { report: [...traceSaid(trace)], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
