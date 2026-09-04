import type { TransactionLine } from "../files/monarch-files.module.code.ts"
import { readAllTransactions, readTransactionsBetween } from "../files/monarch-files.module.code.ts"
import { categoryTitles } from "../rule-pages/monarch-rule-pages.module.code.ts"
import type { Rule } from "../rules/monarch-rules.module.code.ts"
import { bearsOn, clausesMatch, decide, fires } from "../rules/monarch-rules.module.code.ts"
import type { Subject } from "../transaction/monarch-transaction.module.code.ts"

export interface HistoryRow {
  readonly monarchId: string
  readonly date: string
  readonly amount: number
  readonly merchant: string
  readonly statement: string
  readonly account: string
  readonly isRecurring: boolean
  readonly isSplit: boolean
  readonly standingCategory: string
  readonly standingCategoryId: string | null
}

function rowOf(line: TransactionLine, titles: ReadonlyMap<string, string>): HistoryRow {
  const category = line.categorySlug ?? null
  return {
    monarchId: line.monarchId,
    date: line.transactionDay,
    amount: line.amount,
    merchant: line.merchant ?? "",
    statement: line.statementLine ?? "",
    account: line.accountName ?? "",
    isRecurring: line.recurring === true,
    isSplit: line.split === true,
    standingCategory: category === null ? "" : (titles.get(category) ?? category),
    standingCategoryId: category,
  }
}

async function rowsOf(lines: readonly TransactionLine[]): Promise<readonly HistoryRow[]> {
  const titles = await categoryTitles()
  return lines.map((line) => rowOf(line, titles))
}

const FAR_FUTURE = "9999-12-31"

export async function countTransactions(): Promise<number> {
  return (await readAllTransactions()).length
}

export async function readHistory(): Promise<readonly HistoryRow[]> {
  return rowsOf(await readAllTransactions())
}

export async function readSince(from: string): Promise<readonly HistoryRow[]> {
  return rowsOf(await readTransactionsBetween(from, FAR_FUTURE))
}

export async function readTransaction(monarchId: string): Promise<HistoryRow> {
  const found = (await readAllTransactions()).filter((line) => line.monarchId === monarchId)
  if (found.length !== 1) {
    throw new Error(`transaction ${monarchId} resolved ${found.length} pages, expected exactly 1`)
  }
  const rows = await rowsOf(found)
  const row = rows[0]
  if (row === undefined) throw new Error(`transaction ${monarchId} came back empty`)
  return row
}

const DAY_MS = 86_400_000

function shifted(date: string, days: number): string {
  const at = Date.parse(`${date.slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(at)) throw new Error(`"${date}" is not a date, so no window opens around it`)
  return new Date(at + days * DAY_MS).toISOString().slice(0, 10)
}

export async function readNeighbourhood(
  rule: Rule,
  subject: Subject
): Promise<readonly HistoryRow[]> {
  const spec = rule.counterpart
  if (spec === null) return []
  const span = 2 * spec.withinDays
  const date = subject.date.slice(0, 10)
  const rows = await rowsOf(
    await readTransactionsBetween(shifted(date, -span), shifted(date, span))
  )
  return rows.filter((row) => bearsOn(rule, subject, row))
}

export async function unsettled<T extends Subject>(
  rules: readonly Rule[],
  rows: readonly T[]
): Promise<readonly T[]> {
  const left: T[] = []
  for (const row of rows) {
    let settled = false
    for (const rule of rules) {
      if (!clausesMatch(rule, row)) continue
      if (fires(decide(rule, row, await readNeighbourhood(rule, row)))) {
        settled = true
        break
      }
    }
    if (!settled) left.push(row)
  }
  return left
}
