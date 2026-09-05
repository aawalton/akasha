#!/usr/bin/env bun

import { monarchQuery } from "../client/monarch-client.module.code.ts"
import { monarchHeaders } from "../credential/monarch-credential.module.code.ts"
import { categoryPages, readAllTransactions } from "../files/monarch-files.module.code.ts"
import { UNCATEGORIZED } from "../transaction/monarch-transaction.module.code.ts"

export interface Reading {
  readonly what: string
  readonly monarch: number
  readonly mirror: number
}

const COUNT_QUERY = `query GetTransactionsList($filters: TransactionFilterInput) {
  allTransactions(filters: $filters) { totalCount }
}`

async function monarchCount(
  auth: Readonly<Record<string, string>>,
  filters: Record<string, unknown>
): Promise<number> {
  const data = await monarchQuery(auth, "GetTransactionsList", COUNT_QUERY, {
    filters: { search: "", ...filters },
  })
  const all = data.allTransactions
  if (typeof all !== "object" || all === null || !("totalCount" in all)) {
    throw new Error("Monarch answered no allTransactions.totalCount")
  }
  const count = (all as { totalCount: unknown }).totalCount
  if (typeof count !== "number") {
    throw new Error(`Monarch answered a ${typeof count} totalCount rather than a number`)
  }
  return count
}

async function mirrorCounts(): Promise<{
  transactions: number
  needsReview: number
  uncategorized: number
}> {
  const uncategorized = (await categoryPages()).find((page) => page.title === UNCATEGORIZED)
  if (uncategorized === undefined) {
    throw new Error(
      `no category file titled "${UNCATEGORIZED}" stands, so our copy cannot be counted`
    )
  }
  const lines = await readAllTransactions()
  return {
    transactions: lines.length,
    needsReview: lines.filter((line) => line.needsReview === true).length,
    uncategorized: lines.filter((line) => {
      const slug = line.categorySlug
      return slug === undefined || slug === uncategorized.slug
    }).length,
  }
}

export async function agreement(): Promise<readonly Reading[]> {
  const auth = await monarchHeaders()
  const mirror = await mirrorCounts()
  return [
    { what: "transactions", monarch: await monarchCount(auth, {}), mirror: mirror.transactions },
    {
      what: "needing review",
      monarch: await monarchCount(auth, { needsReview: true }),
      mirror: mirror.needsReview,
    },
    {
      what: "uncategorized",
      monarch: await monarchCount(auth, { isUncategorized: true }),
      mirror: mirror.uncategorized,
    },
  ]
}

export function disagreements(readings: readonly Reading[]): readonly Reading[] {
  return readings.filter((r) => r.monarch !== r.mirror)
}

function line(r: Reading): string {
  return `${r.what}: Monarch ${r.monarch}, our copy ${r.mirror} (${r.mirror - r.monarch >= 0 ? "+" : ""}${r.mirror - r.monarch})`
}

export async function reportAgreement(): Promise<readonly Reading[]> {
  return report(await agreement())
}

export function report(readings: readonly Reading[]): readonly Reading[] {
  for (const r of readings) console.log(`  ${line(r)}`)
  const parted = disagreements(readings)
  if (parted.length === 0) return parted
  console.log(
    `  our copy and Monarch part on ${parted.length} of the three counts, and nothing carries that anywhere`
  )
  return parted
}

if (import.meta.main) {
  console.log("--- our copy against Monarch ---")
  const parted = await reportAgreement()
  if (parted.length > 0) process.exit(1)
  console.log("  agreed on all three")
}
