#!/usr/bin/env bun

import { applyDecision } from "../apply/monarch-apply.module.code.ts"
import type { HistoryRow } from "../history/monarch-history.module.code.ts"
import { readNeighbourhood, readSince } from "../history/monarch-history.module.code.ts"
import { loadCategoryRules } from "../rule-documents/monarch-rule-documents.module.code.ts"
import { categoryTitles, readFlags } from "../rule-pages/monarch-rule-pages.module.code.ts"
import { clausesMatch, decide } from "../rules/monarch-rules.module.code.ts"
import {
  answered,
  UNATTENDED_DAYS,
  unattendedFrom,
} from "../transaction/monarch-transaction.module.code.ts"

export interface CategorizeTally {
  readonly set: number
  readonly legs: number
  readonly left: ReadonlyMap<string, number>
  readonly contested: readonly string[]
}

function describe(row: HistoryRow): string {
  return `${row.date}  ${row.amount.toFixed(2).padStart(10)}  ${row.merchant || row.statement}`
}

export async function categorizeRecent(options: {
  readonly dryRun: boolean
}): Promise<CategorizeTally> {
  const from = unattendedFrom()
  const rules = (await loadCategoryRules()).rules
  const titles = await categoryTitles()
  const rows = (await readSince(from)).filter(
    (row) => !answered(row.standingCategory) && !row.isSplit
  )

  console.log(`  window ${from} onward (${UNATTENDED_DAYS} days), ${rules.length} rule(s) standing`)
  console.log(`  ${rows.length} row(s) unanswered and unsplit`)

  const left = new Map<string, number>()
  const contested: string[] = []
  let set = 0
  let legs = 0

  for (const row of rows) {
    const matched = rules.filter((rule) => clausesMatch(rule, row))
    if (matched.length > 1) {
      contested.push(
        `${row.monarchId}  ${describe(row)}  — ${matched.map((one) => one.name).join(", ")}`
      )
      continue
    }
    const rule = matched[0]
    if (rule === undefined) {
      left.set("no rule claims it", (left.get("no rule claims it") ?? 0) + 1)
      continue
    }
    const decision = decide(rule, row, await readNeighbourhood(rule, row))
    if (decision.kind !== "categorize") {
      const why = `${rule.name}: ${decision.kind}`
      left.set(why, (left.get(why) ?? 0) + 1)
      continue
    }
    const title = titles.get(decision.category) ?? decision.category
    if (options.dryRun) {
      console.log(`  would set  ${describe(row)}  →  ${title}  (${rule.name})`)
      set += 1
      continue
    }
    const applied = await applyDecision(rule, row, decision)
    set += 1
    legs += applied.legs.length
    console.log(`  set  ${describe(row)}  →  ${title}  (${rule.name}, ${applied.legs.length} leg)`)
  }

  console.log(`  ${options.dryRun ? "would set" : "set"} ${set} row(s) over ${legs} leg(s)`)
  for (const [why, count] of [...left.entries()].sort((one, other) => other[1] - one[1])) {
    console.log(`  left  ${String(count).padStart(4)}  ${why}`)
  }
  if (contested.length > 0) {
    console.log(
      `  ${contested.length} row(s) claimed by more than one rule, none of them written. The ` +
        "rule set is meant to be a partition, so this is the audit and the world disagreeing:"
    )
    for (const one of contested) console.log(`    ${one}`)
  }
  return { set, legs, left, contested }
}

if (import.meta.main) {
  const flags = readFlags(process.argv.slice(2))
  const dryRun = flags.has("dry-run")
  const tally = await categorizeRecent({ dryRun })
  if (dryRun) console.log("\nnothing was written.")
  if (tally.contested.length > 0) process.exit(1)
}
