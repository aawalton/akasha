#!/usr/bin/env bun

import { readAllTransactions } from "./files.ts"
import type { TransactionLine } from "./files.ts"
import { categoryTitles } from "./rule-pages.ts"
import { TRUSTED_MONTHS, UNCATEGORIZED, dayGap, trustedFrom } from "./transaction.ts"

const ROWS = 60

export interface Row {
  readonly monarchId: string
  readonly date: string
  readonly amount: number
  readonly account: string
  readonly merchant: string
  readonly statement: string
  readonly category: string
  readonly trusted: boolean
  readonly notes: string
}

export interface Filter {
  readonly ids?: readonly string[]
  readonly notId?: string
  readonly from?: string
  readonly to?: string
  readonly accountContains?: readonly string[]
  readonly nameContains?: string
  readonly around?: { readonly date: string; readonly days: number }
  readonly magnitude?: number
  readonly uncategorizedOnly?: boolean
}

function has(text: string, part: string): boolean {
  return text.toLowerCase().includes(part.toLowerCase())
}

function rowOf(line: TransactionLine, titles: ReadonlyMap<string, string>, from: string): Row {
  const slug = line.categorySlug
  return {
    monarchId: line.monarchId,
    date: line.transactionDay,
    amount: line.amount,
    account: line.accountName ?? "",
    merchant: line.merchant ?? "",
    statement: line.statementLine ?? "",
    category: slug === undefined ? "" : (titles.get(slug) ?? slug),
    trusted: line.transactionDay >= from,
    notes: line.transactionNote ?? "",
  }
}

export async function allRows(): Promise<readonly Row[]> {
  const titles = await categoryTitles()
  const from = trustedFrom()
  return (await readAllTransactions()).map((line) => rowOf(line, titles, from))
}

export function matches(row: Row, filter: Filter): boolean {
  if (filter.ids !== undefined && !filter.ids.includes(row.monarchId)) return false
  if (filter.notId !== undefined && row.monarchId === filter.notId) return false
  if (filter.from !== undefined && row.date < filter.from) return false
  if (filter.to !== undefined && row.date > filter.to) return false
  if (filter.accountContains !== undefined && filter.accountContains.length > 0) {
    if (!filter.accountContains.some((text) => has(row.account, text))) return false
  }
  if (filter.nameContains !== undefined) {
    if (!has(row.merchant, filter.nameContains) && !has(row.statement, filter.nameContains)) {
      return false
    }
  }
  if (filter.around !== undefined && dayGap(row.date, filter.around.date) > filter.around.days) {
    return false
  }
  if (filter.magnitude !== undefined && Math.abs(row.amount) !== filter.magnitude) return false
  if (filter.uncategorizedOnly === true && row.category !== "" && row.category !== UNCATEGORIZED) {
    return false
  }
  return true
}

function ordered(rows: readonly Row[], newestFirst: boolean): readonly Row[] {
  const sign = newestFirst ? -1 : 1
  return [...rows].sort(
    (one, other) =>
      sign * (one.date.localeCompare(other.date) || one.monarchId.localeCompare(other.monarchId))
  )
}

export async function rowsMatching(
  filter: Filter,
  limit: number,
  newestFirst: boolean
): Promise<readonly Row[]> {
  const found = (await allRows()).filter((row) => matches(row, filter))
  return ordered(found, newestFirst).slice(0, limit)
}

export async function countMatching(filter: Filter): Promise<number> {
  return (await allRows()).filter((row) => matches(row, filter)).length
}

function money(amount: number): string {
  return amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `+$${amount.toFixed(2)}`
}

function categoryOf(row: Row): string {
  if (row.category === "" || row.category === UNCATEGORIZED) return "none"
  return `${row.category} (${row.trusted ? "trusted" : "untrusted"})`
}

export function show(row: Row): string {
  return (
    `${row.date} | ${money(row.amount)} | id=${row.monarchId} | account=${row.account} | ` +
    `merchant=${JSON.stringify(row.merchant)} | statement=${JSON.stringify(row.statement)} | ` +
    `category=${categoryOf(row)}` +
    (row.notes === "" ? "" : ` | note=${JSON.stringify(row.notes)}`)
  )
}

function print(label: string, rows: readonly Row[], matched: number): void {
  console.log(`${label} — ${matched} matched, ${rows.length} shown`)
  if (rows.length < matched) {
    console.log("  MORE STAND THAN ARE SHOWN. Narrow the lookup or raise --limit; a count taken")
    console.log("  from the lines below counts what fitted rather than what matched.")
  }
  for (const row of rows) console.log(`  ${show(row)}`)
  if (rows.length === 0) console.log("  nothing")
}

async function one(monarchId: string): Promise<Row> {
  const rows = await rowsMatching({ ids: [monarchId] }, 2, false)
  const row = rows[0]
  if (rows.length !== 1 || row === undefined) {
    throw new Error(`transaction ${monarchId} resolved ${rows.length} rows, expected exactly 1`)
  }
  return row
}

async function transaction(monarchId: string): Promise<void> {
  const row = await one(monarchId)
  print(`transaction ${monarchId}`, [row], 1)
}

async function neighbours(
  monarchId: string,
  days: number,
  sameAmount: boolean,
  limit: number
): Promise<void> {
  const anchor = await one(monarchId)
  const filter: Filter = {
    around: { date: anchor.date, days },
    notId: monarchId,
    ...(sameAmount ? { magnitude: Math.abs(anchor.amount) } : {}),
  }
  console.log(`anchor: ${show(anchor)}`)
  print(
    `within ${days} days${sameAmount ? " at the same magnitude" : ""}, every account`,
    await rowsMatching(filter, limit, false),
    await countMatching(filter)
  )
}

async function merchant(text: string, limit: number): Promise<void> {
  const filter: Filter = { nameContains: text }
  const found = (await allRows()).filter((row) => matches(row, filter))
  const tally = new Map<string, number>()
  for (const row of found) {
    const key = `${row.category === "" ? UNCATEGORIZED : row.category}\t${row.trusted}`
    tally.set(key, (tally.get(key) ?? 0) + 1)
  }
  console.log(`merchant or statement containing ${JSON.stringify(text)}`)
  console.log("  standing categories, by how many rows carry each:")
  if (tally.size === 0) console.log("    nothing")
  for (const [key, rows] of [...tally.entries()].sort((one, other) => other[1] - one[1])) {
    const [category = "", trusted = "false"] = key.split("\t")
    const mark = trusted === "true" ? "trusted" : "untrusted"
    console.log(`    ${rows} × ${category} (${mark})`)
  }
  print("  most recent rows", await rowsMatching(filter, limit, true), found.length)
}

async function account(text: string, from: string, to: string, limit: number): Promise<void> {
  const filter: Filter = { accountContains: [text], from, to }
  print(
    `account containing ${JSON.stringify(text)}, ${from} to ${to}`,
    await rowsMatching(filter, limit, false),
    await countMatching(filter)
  )
}

export const USAGE = [
  "bun monarch/evidence.ts <lookup> — read-only evidence about transactions",
  "",
  "  transaction <id>",
  "      the row itself",
  "  neighbours <id> [--days N] [--same-amount] [--limit N]",
  "      what else happened within N days, in EVERY account rather than only its own.",
  "      --same-amount keeps only rows of the same magnitude, either sign, which is how",
  "      the other leg of a movement between two accounts is found. --days defaults to 7.",
  "  merchant <text> [--limit N]",
  "      every row whose merchant name OR raw statement contains the text: what this",
  "      household has settled that merchant as before, tallied, then the recent rows",
  "  account <text> [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--limit N]",
  "      rows on an account whose title contains the text, over a span",
  "",
  `A category prints as trusted where the row falls inside the last ${TRUSTED_MONTHS} months and`,
  "untrusted where it does not. An untrusted category is a fact about the row and is not",
  "an answer about what the row should be called.",
  "",
  `--limit defaults to ${ROWS} rows.`,
].join("\n")

function flag(argv: readonly string[], name: string): string | null {
  const at = argv.indexOf(`--${name}`)
  if (at === -1) return null
  const held = argv[at + 1]
  if (held === undefined || held.startsWith("--")) throw new Error(`--${name} takes a value`)
  return held
}

function numberFlag(argv: readonly string[], name: string, fallback: number): number {
  const held = flag(argv, name)
  if (held === null) return fallback
  const parsed = Number(held)
  if (!Number.isFinite(parsed)) throw new Error(`--${name} takes a number, got "${held}"`)
  return parsed
}

if (import.meta.main) {
  const argv = process.argv.slice(2)
  const lookup = argv[0]
  const subject = argv[1]
  const limit = numberFlag(argv, "limit", ROWS)
  if (lookup === undefined || subject === undefined || subject.startsWith("--")) {
    console.log(USAGE)
    process.exit(lookup === undefined ? 0 : 1)
  } else if (lookup === "transaction") {
    await transaction(subject)
  } else if (lookup === "neighbours") {
    await neighbours(subject, numberFlag(argv, "days", 7), argv.includes("--same-amount"), limit)
  } else if (lookup === "merchant") {
    await merchant(subject, limit)
  } else if (lookup === "account") {
    await account(subject, flag(argv, "from") ?? "0000-01-01", flag(argv, "to") ?? "9999-12-31", limit)
  } else {
    console.log(USAGE)
    console.error(`\nno lookup called "${lookup}"`)
    process.exit(1)
  }
}
