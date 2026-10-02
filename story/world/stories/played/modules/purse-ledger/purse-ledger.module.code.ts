import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { linesIn } from "akasha/story/world/stories/played/modules/played-pools/played-pools.module.code.ts"
import {
  type Currency,
  countedIn,
  currencyOf,
  purseNameOf,
  wordsIn,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"

const VALUE_KEY = "value"

const HISTORY_KEY = "history"

const GAINED = "+"

const SPENT = "−"

export type LedgerLine = {
  readonly turn: number
  readonly change: string
  readonly total: string
}

type Line = { readonly turn: number; readonly value: number }

function shownOf(amount: number, currency: Currency | undefined): string {
  return String(countedIn(amount, currency?.denominations ?? []))
}

export function ledgerOf(
  lines: readonly Line[],
  currency: Currency | undefined,
  turn: number
): readonly LedgerLine[] {
  const ledger: LedgerLine[] = []
  let before = 0
  for (const line of lines) {
    if (line.turn > turn) continue
    const change = line.value - before
    before = line.value
    if (change === 0) continue
    ledger.push({
      turn: line.turn,
      change: `${change < 0 ? SPENT : GAINED}${shownOf(Math.abs(change), currency)}`,
      total: shownOf(line.value, currency),
    })
  }
  return ledger.toReversed()
}

export function ledgersIn(
  rows: readonly QueryRow[],
  currencies: ReadonlyMap<string, Currency>,
  turn: number
): Readonly<Record<string, readonly LedgerLine[]>> {
  const ledgers: Record<string, readonly LedgerLine[]> = {}
  for (const row of rows) {
    if (parseNumber(row.values[VALUE_KEY]) === undefined || wordsIn(row) !== null) continue
    const ledger = ledgerOf(linesIn(row.values[HISTORY_KEY]), currencyOf(row, currencies), turn)
    if (ledger.length > 0) ledgers[purseNameOf(row, currencies)] = ledger
  }
  return ledgers
}
