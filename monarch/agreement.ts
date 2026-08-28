#!/usr/bin/env bun

import { monarchQuery } from "./client.ts"
import { monarchHeaders } from "./credential.ts"
import { categoryPages, readAllTransactions } from "./files.ts"
import { UNCATEGORIZED } from "./transaction.ts"

function lastReported(): string {
  const home = process.env.HOME
  if (home === undefined || home === "") {
    throw new Error("$HOME is unset, so nothing says where the last record filed stands")
  }
  return `${home}/.cache/monarch-agreement.json`
}

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
    throw new Error(`no category file titled "${UNCATEGORIZED}" stands, so our copy cannot be counted`)
  }
  const lines = await readAllTransactions()
  return {
    transactions: lines.length,
    needsReview: lines.filter((line) => line["needs-review"] === true).length,
    uncategorized: lines.filter((line) => {
      const slug = line["category-slug"]
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

async function alreadyReported(body: string): Promise<boolean> {
  const at = lastReported()
  try {
    return (await Bun.file(at).text()) === body
  } catch {
    return false
  }
}

export async function reportAgreement(recordTo: string): Promise<readonly Reading[]> {
  return report(await agreement(), recordTo)
}

export async function report(
  readings: readonly Reading[],
  recordTo: string
): Promise<readonly Reading[]> {
  for (const r of readings) console.log(`  ${line(r)}`)
  const parted = disagreements(readings)
  if (parted.length === 0) return parted

  const body =
    "Our copy of Monarch has stopped agreeing with Monarch.\n\n" +
    parted.map((r) => `- ${line(r)}`).join("\n") +
    "\n\nCounted by `monarch/agreement.ts` after a sync, over every transaction either " +
    "side holds. Both home-screen rings draw off our copy, so a difference here is a " +
    "number Alan and Jenny are reading as true. `monarch/reconcile.ts` retires what " +
    "Monarch no longer lists, and a split parent was what parted them last (#18176)."
  if (await alreadyReported(body)) {
    console.log("  (unchanged since the last record filed, so no second one)")
    return parted
  }
  await Bun.write(lastReported(), body)
  const child = Bun.spawn(["ops", "seat", "record", recordTo, "--content-file", "-"], {
    stdin: new TextEncoder().encode(body),
    stdout: "pipe",
    stderr: "pipe",
  })
  if ((await child.exited) !== 0) {
    console.error(`  filing a record for ${recordTo} failed: ${await new Response(child.stderr).text()}`)
  } else {
    console.log(`  filed a record for ${recordTo}`)
  }
  return parted
}

export const RECORD_TO = "amy"

if (import.meta.main) {
  console.log("--- our copy against Monarch ---")
  const parted = await reportAgreement(RECORD_TO)
  if (parted.length > 0) process.exit(1)
  console.log("  agreed on all three")
}
