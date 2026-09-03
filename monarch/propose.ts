#!/usr/bin/env bun

import { readHistory } from "./history.ts"
import type { Proposal } from "./report.ts"
import { report } from "./report.ts"
import { candidateRule } from "./candidate.ts"
import { loadCategoryRules, ruleFolder } from "./rule-documents.ts"
import { categoryTitles, readFlags } from "./rule-pages.ts"
import type { Rule } from "./rules.ts"
import { decide, neighbourhoods } from "./rules.ts"

const DEFAULT_LIMIT = 30

async function chosenRules(flags: ReadonlyMap<string, readonly string[]>): Promise<readonly Rule[]> {
  const candidate = await candidateRule(flags)
  if (candidate !== null) return [candidate]
  const standing = (await loadCategoryRules()).rules
  const named = flags.get("rule")?.[0] ?? null
  if (named === null) return standing
  const found = standing.filter((rule) => rule.name === named)
  if (found.length === 0) {
    throw new Error(
      `no rule named "${named}" stands. What does: ${standing.map((rule) => rule.name).join(", ")}`
    )
  }
  return found
}

function chosenLimit(flags: ReadonlyMap<string, readonly string[]>): number {
  const text = flags.get("limit")?.[0]
  if (text === undefined) return DEFAULT_LIMIT
  const limit = Number.parseInt(text, 10)
  if (!Number.isFinite(limit) || limit <= 0) throw new Error(`--limit ${text} is not a count`)
  return limit
}

if (import.meta.main) {
  const flags = readFlags(process.argv.slice(2))
  const rules = await chosenRules(flags)
  if (rules.length === 0) {
    throw new Error(
      "no rule stands and none was given, so there is nothing to propose. The rules stand at " +
        `${ruleFolder()}.`
    )
  }
  const titles = await categoryTitles()
  const history = await readHistory()
  const near = neighbourhoods(history)
  const proposals: readonly Proposal[] = history.map((row) => ({
    row,
    decided: rules
      .map((rule) => ({ rule, decision: decide(rule, row, near(rule, row)) }))
      .filter((entry) => entry.decision.kind !== "no-match"),
  }))
  console.log(
    report(proposals, rules, titles, { limit: chosenLimit(flags), rows: flags.has("rows") })
  )
}
