#!/usr/bin/env bun

import { categorizeRecent } from "../categorize-recent/monarch-categorize-recent.module.code.ts"
import type { MonarchStamp, MonarchTransaction } from "../client/monarch-client.module.code.ts"
import { monarchClient } from "../client/monarch-client.module.code.ts"
import { monarchHeaders } from "../credential/monarch-credential.module.code.ts"
import {
  landTransactionFiles,
  linesFrom,
  slugMaps,
} from "../land-files/monarch-land-files.module.code.ts"
import type { MirroredRow } from "../reconcile/monarch-reconcile.module.code.ts"
import {
  clearVanishedIdsAmong,
  mirroredWindow,
} from "../reconcile/monarch-reconcile.module.code.ts"
import { trustedFrom } from "../transaction/monarch-transaction.module.code.ts"

export interface PollTally {
  readonly seen: number
  readonly changed: number
  readonly landed: number
  readonly retired: number
}

const REFETCH_IDS = 400

function chunk<T>(items: readonly T[], size: number): readonly (readonly T[])[] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

export function changedIds(
  stamps: readonly MonarchStamp[],
  held: ReadonlyMap<string, string | null>
): readonly string[] {
  const changed: string[] = []
  for (const stamp of stamps) {
    if (held.get(stamp.id) !== stamp.updatedAt) changed.push(stamp.id)
  }
  return changed
}

export function heldWatermarks(rows: readonly MirroredRow[]): ReadonlyMap<string, string | null> {
  return new Map(rows.map((row) => [row.monarchId, row.updatedAt]))
}

export async function pollTransactions(options: { readonly verbose: boolean }): Promise<PollTally> {
  const monarch = monarchClient(await monarchHeaders())
  const window = { startDate: trustedFrom(), endDate: new Date().toISOString().slice(0, 10) }
  const scope = `${window.startDate} to ${window.endDate}`

  const stamps = await monarch.transactionStamps(window)
  const rows = await mirroredWindow(window)
  const changed = changedIds(stamps, heldWatermarks(rows))
  const fetchedIds = new Set(stamps.map((s) => s.id))
  const missing = rows.filter((row) => !fetchedIds.has(row.monarchId)).length

  if (changed.length === 0 && missing === 0) {
    if (options.verbose) {
      console.log(`${stamps.length} row(s) over ${scope}, every watermark the one we hold`)
    }
    return { seen: stamps.length, changed: 0, landed: 0, retired: 0 }
  }

  let landed = 0
  if (changed.length > 0) {
    const maps = await slugMaps()
    const fetched: MonarchTransaction[] = []
    for (const batch of chunk(changed, REFETCH_IDS)) {
      fetched.push(...(await monarch.transactions({ ids: batch })))
    }

    const ready = fetched.filter((t) => t.account !== null && maps.accounts.has(t.account.id))
    if (ready.length < fetched.length) {
      console.warn(
        `  ${fetched.length - ready.length} row(s) name an account no account file carries. ` +
          "This path fetches no accounts, so they are left for the daily full sync rather than " +
          "failing every run after this one."
      )
    }
    const unknown = [
      ...new Set(
        ready.flatMap((t) =>
          t.category !== null && !maps.categories.has(t.category.id) ? [t.category.name] : []
        )
      ),
    ]
    if (unknown.length > 0) {
      console.warn(
        `  ${unknown.length} category(s) no category file carries, so those transactions keep ` +
          `the category they hold until the daily full sync: ${unknown.join(", ")}`
      )
    }

    const held = linesFrom(ready, maps)
    if (held.unknownTags.length > 0) {
      console.warn(
        `  ${held.unknownTags.length} tag(s) no tag file carries, left off until the daily full ` +
          `sync: ${held.unknownTags.join(", ")}`
      )
    }
    landed = held.lines.length
    const months = await landTransactionFiles(held.lines)
    console.log(
      `${changed.length} row(s) moved over ${scope}, ${landed} landed over ` +
        `${months.length} month file(s)`
    )
  }

  const retired = await clearVanishedIdsAmong(fetchedIds, rows, scope)
  if (retired.length > 0) {
    console.log(`  retired ${retired.length} transaction(s) Monarch no longer lists`)
  }

  if (landed > 0) {
    const tally = await categorizeRecent({ dryRun: false })
    if (tally.contested.length > 0) {
      throw new Error(`${tally.contested.length} row(s) claimed by more than one rule`)
    }
  }
  return { seen: stamps.length, changed: changed.length, landed, retired: retired.length }
}
