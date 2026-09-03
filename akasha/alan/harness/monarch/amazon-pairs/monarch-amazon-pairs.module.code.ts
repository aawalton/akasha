#!/usr/bin/env bun

import { readAllTransactions } from "../files/monarch-files.module.code.ts"
import { categoryTitles } from "../rule-pages/monarch-rule-pages.module.code.ts"

export interface PairRow {
  readonly monarchId: string
  readonly date: string
  readonly amountCents: number
  readonly category: string | null
  readonly orderNumber: string
}

export interface Divergence {
  readonly orderNumber: string
  readonly debits: readonly PairRow[]
  readonly credits: readonly PairRow[]
  readonly categories: readonly (string | null)[]
}

export interface Undecided {
  readonly orderNumber: string
  readonly debits: readonly PairRow[]
  readonly credits: readonly PairRow[]
  readonly netCents: number
}

export function undecided(category: string | null): boolean {
  return category === null || category === "Uncategorized"
}

function byOrder(rows: readonly PairRow[]): ReadonlyMap<string, readonly PairRow[]> {
  const grouped = new Map<string, PairRow[]>()
  for (const row of rows) {
    const held = grouped.get(row.orderNumber)
    if (held === undefined) grouped.set(row.orderNumber, [row])
    else held.push(row)
  }
  return grouped
}

export function undecidedPairs(rows: readonly PairRow[]): readonly Undecided[] {
  const found: Undecided[] = []
  for (const [orderNumber, group] of byOrder(rows)) {
    const debits = group.filter((r) => r.amountCents < 0)
    const credits = group.filter((r) => r.amountCents > 0)
    if (debits.length === 0 || credits.length === 0) continue
    if (!group.every((r) => undecided(r.category))) continue
    found.push({
      orderNumber,
      debits,
      credits,
      netCents: group.reduce((sum, r) => sum + r.amountCents, 0),
    })
  }
  return found
}

export function divergentPairs(rows: readonly PairRow[]): readonly Divergence[] {
  const found: Divergence[] = []
  for (const [orderNumber, group] of byOrder(rows)) {
    const debits = group.filter((r) => r.amountCents < 0)
    const credits = group.filter((r) => r.amountCents > 0)
    if (debits.length === 0 || credits.length === 0) continue
    const categories = [...new Set(group.map((r) => r.category))]
    if (categories.length < 2) continue
    found.push({ orderNumber, debits, credits, categories })
  }
  return found
}

export async function pairedRows(): Promise<readonly PairRow[]> {
  const titles = await categoryTitles()
  const held: PairRow[] = []
  for (const line of await readAllTransactions()) {
    const orderNumber = line.amazonOrderNumber
    if (orderNumber === undefined || orderNumber === "") continue
    const slug = line.categorySlug
    held.push({
      monarchId: line.monarchId,
      date: line.transactionDay.slice(0, 10),
      amountCents: Math.round(line.amount * 100),
      category: slug === undefined ? null : (titles.get(slug) ?? slug),
      orderNumber,
    })
  }
  return held
}

const money = (cents: number): string =>
  `${cents < 0 ? "-" : "+"}$${Math.abs(cents / 100).toFixed(2)}`

function line(row: PairRow): string {
  return `      ${row.date} ${money(row.amountCents)} ${row.monarchId} — ${row.category ?? "no category"}`
}

async function main(): Promise<void> {
  const rows = await pairedRows()
  const orders = new Set(rows.map((r) => r.orderNumber))
  const paired = new Set(
    [...orders].filter(
      (o) =>
        rows.some((r) => r.orderNumber === o && r.amountCents < 0) &&
        rows.some((r) => r.orderNumber === o && r.amountCents > 0)
    )
  )
  console.log(
    `${rows.length} transaction(s) carry amazonOrderNumber, across ${orders.size} order(s)`
  )
  console.log(
    `${paired.size} order(s) hold both a charge and a refund, which is what this can ask about`
  )

  const found = divergentPairs(rows)
  if (found.length === 0) {
    console.log(`\nno category divergence across those ${paired.size} pair(s)`)
  } else {
    console.log(`\n${found.length} order(s) whose charge and refund disagree about category:`)
    for (const d of found) {
      console.log(
        `\n  order ${d.orderNumber} — ${d.categories.map((c) => c ?? "no category").join(" / ")}`
      )
      for (const row of d.debits) console.log(line(row))
      for (const row of d.credits) console.log(line(row))
    }
  }

  const open = undecidedPairs(rows)
  if (open.length === 0) {
    console.log(`\nno pair left wholly undecided across those ${paired.size} pair(s)`)
  } else {
    console.log(`\n${open.length} of ${paired.size} pair(s) where NO side names a category:`)
    const sorted = [...open].sort((a, b) => Math.abs(a.netCents) - Math.abs(b.netCents))
    for (const u of sorted) {
      const net =
        u.netCents === 0 ? "nets to zero — bought and sent back" : `NETS ${money(u.netCents)}`
      console.log(`\n  order ${u.orderNumber} — ${net}`)
      for (const row of [...u.debits, ...u.credits]) console.log(line(row))
    }
    const moved = sorted.filter((u) => u.netCents !== 0)
    if (moved.length > 0) {
      console.log(
        `\n${moved.length} of those moved money. A fully refunded order nets to zero, so a pair ` +
          `that does not is either missing a transaction or holding one twice — which is a ` +
          `question about the card feed rather than about categories.`
      )
    }
  }

  console.log(
    `\nReported and not corrected. Which category a refund should carry is Alan's ` +
      `to settle, and nothing here writes one.`
  )
}

if (import.meta.main) {
  await main()
}
