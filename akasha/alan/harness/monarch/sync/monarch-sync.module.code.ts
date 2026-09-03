#!/usr/bin/env bun

import { RECORD_TO, reportAgreement } from "../agreement/monarch-agreement.module.code.ts"
import { categorizeRecent } from "../categorize-recent/monarch-categorize-recent.module.code.ts"
import type {
  MonarchHolding,
  MonarchTag,
  MonarchTransaction,
} from "../client/monarch-client.module.code.ts"
import { monarchClient } from "../client/monarch-client.module.code.ts"
import { monarchHeaders } from "../credential/monarch-credential.module.code.ts"
import {
  landAccountFiles,
  landCategoryFiles,
  landHoldingFiles,
  landTagFiles,
} from "../domain-files/monarch-domain-files.module.code.ts"
import { landTransactionFiles, linesFor } from "../land-files/monarch-land-files.module.code.ts"
import {
  clearStalePending,
  clearVanishedAgainstFullFetch,
  clearVanishedInWindow,
} from "../reconcile/monarch-reconcile.module.code.ts"
import { trustedFrom } from "../transaction/monarch-transaction.module.code.ts"

export interface SyncTally {
  readonly landed: number
  readonly failed: number
}

function day(offsetDays: number): string {
  const at = new Date()
  at.setDate(at.getDate() - offsetDays)
  return at.toISOString().slice(0, 10)
}

function distinctTags(txns: readonly MonarchTransaction[]): readonly MonarchTag[] {
  const seen = new Map<string, MonarchTag>()
  for (const t of txns) for (const tag of t.tags) if (!seen.has(tag.id)) seen.set(tag.id, tag)
  return [...seen.values()]
}

function say(phase: string, tally: SyncTally): void {
  console.log(`  ${phase}: ${tally.landed} landed, ${tally.failed} failed`)
}

export async function sync(options: { readonly incremental: boolean }): Promise<SyncTally> {
  const monarch = monarchClient(await monarchHeaders())
  let landed = 0
  let failed = 0

  console.log("--- Phase 1: accounts ---")
  const accounts = await monarch.accounts()
  console.log(`  fetched ${accounts.length}`)
  const accountSlugs = await landAccountFiles(accounts)
  landed += accounts.length

  const window = options.incremental ? { startDate: trustedFrom(), endDate: day(0) } : undefined
  console.log(
    window === undefined
      ? "--- Phase 2: transactions (all time) ---"
      : `--- Phase 2: transactions (${window.startDate} to ${window.endDate}) ---`
  )
  const transactions = await monarch.transactions(window ?? {})
  console.log(`  fetched ${transactions.length}`)

  const categoryList = await monarch.categories()
  await landCategoryFiles(categoryList)
  await landTagFiles(distinctTags(transactions))

  const held = await linesFor(transactions)
  if (held.skipped > 0) {
    console.log(`  ${held.skipped} transaction(s) name an account no file carries`)
  }
  const months = await landTransactionFiles(held.lines)
  console.log(`  ${held.lines.length} transaction(s) over ${months.length} month file(s)`)
  const cleared = await clearStalePending(transactions)
  if (cleared.length > 0) {
    console.log(`  cleared ${cleared.length} stale pending transaction(s): ${cleared.join(", ")}`)
  }
  const vanished =
    window === undefined
      ? await clearVanishedAgainstFullFetch(transactions)
      : await clearVanishedInWindow(transactions, window)
  if (vanished.length > 0) {
    console.log(`  retired ${vanished.length} transaction(s) Monarch no longer lists`)
  }
  landed += categoryList.length + held.lines.length

  console.log("--- Phase 3: holdings ---")
  const investment = accounts.filter((a) => a.holdingsCount > 0)
  console.log(`  ${investment.length} account(s) report holdings`)
  const broken: string[] = []
  const wanted: { accountSlug: string; holding: MonarchHolding }[] = []
  for (const account of investment) {
    try {
      const accountSlug = accountSlugs.get(account.id)
      if (accountSlug === undefined) {
        throw new Error(`no account file resolved for monarchId=${account.id}`)
      }
      const holdings = await monarch.holdings(account.id)
      if (holdings.length === 0) continue
      for (const holding of holdings) wanted.push({ accountSlug, holding })
      say(`  ${account.displayName}`, { landed: holdings.length, failed: 0 })
    } catch (error) {
      console.error(`  ${account.displayName} failed:`, error)
      failed += 1
      broken.push(account.displayName)
    }
  }
  await landHoldingFiles(wanted)
  landed += wanted.length

  console.log("--- our copy against Monarch ---")
  try {
    await reportAgreement(RECORD_TO)
  } catch (error) {
    console.error("  could not compare our copy against Monarch:", error)
  }

  console.log("--- categorizing what arrived ---")
  let unsettled: string | null = null
  try {
    const tally = await categorizeRecent({ dryRun: false })
    if (tally.contested.length > 0) {
      unsettled = `${tally.contested.length} row(s) claimed by more than one rule`
    }
  } catch (error) {
    unsettled = `the rules could not be run over what arrived: ${String(error)}`
  }

  console.log(`--- done: ${landed} landed, ${failed} failed ---`)
  if (failed > 0) {
    throw new Error(`Monarch sync finished with ${failed} account(s) failing: ${broken.join(", ")}`)
  }
  if (unsettled !== null) throw new Error(unsettled)
  return { landed, failed }
}
