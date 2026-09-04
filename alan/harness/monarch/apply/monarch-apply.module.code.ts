#!/usr/bin/env bun

import { candidateRule } from "../candidate/monarch-candidate.module.code.ts"
import { setCategory } from "../categorize/monarch-categorize.module.code.ts"
import { monarchClient } from "../client/monarch-client.module.code.ts"
import { monarchHeaders } from "../credential/monarch-credential.module.code.ts"
import type { HistoryRow } from "../history/monarch-history.module.code.ts"
import { readNeighbourhood, readTransaction } from "../history/monarch-history.module.code.ts"
import { writeNoteIfEmpty } from "../notes-write/monarch-notes-write.module.code.ts"
import { loadCategoryRules } from "../rule-documents/monarch-rule-documents.module.code.ts"
import { categoryMonarchId, readFlags } from "../rule-pages/monarch-rule-pages.module.code.ts"
import type { Decision, Rule } from "../rules/monarch-rules.module.code.ts"
import { decide } from "../rules/monarch-rules.module.code.ts"

async function chosenRule(flags: ReadonlyMap<string, readonly string[]>): Promise<Rule> {
  const candidate = await candidateRule(flags)
  if (candidate !== null) return candidate
  const named = flags.get("rule")?.[0]
  if (named === undefined) {
    throw new Error("name the rule that decided: --rule <name>, or --candidate with its clauses")
  }
  const standing = (await loadCategoryRules()).rules
  const found = standing.find((rule) => rule.name === named)
  if (found === undefined) {
    throw new Error(
      `no rule named "${named}" stands. What does: ${standing.map((rule) => rule.name).join(", ")}`
    )
  }
  return found
}

export function categoryFrom(rule: Rule, row: HistoryRow, decision: Decision): string {
  switch (decision.kind) {
    case "categorize":
      return decision.category
    case "no-match":
      throw new Error(
        `rule "${rule.name}" does not match transaction ${row.monarchId} — merchant ` +
          `"${row.merchant}", statement "${row.statement}", account "${row.account}", amount ` +
          `${row.amount}. Applying it anyway would record a decision as the rule's that the rule ` +
          "did not make."
      )
    case "reserve":
      throw new Error(
        `rule "${rule.name}" reserves transaction ${row.monarchId} for a person, so it names no ` +
          "category to set. A reservation is answered by somebody saying what the transaction is."
      )
    case "unpaired":
      throw new Error(
        `rule "${rule.name}" matched transaction ${row.monarchId} and found no opposite leg for ` +
          `${row.amount} inside its window, so it reached no conclusion to apply.`
      )
    case "ambiguous":
      throw new Error(
        `rule "${rule.name}" found transaction ${row.monarchId} ambiguous — ${decision.why}: ` +
          `${decision.candidates.join(", ")}. Alan ruled that these fall through to semantic ` +
          "review rather than being guessed between, so this path will not settle it."
      )
  }
}

function pairedLeg(decision: Decision): readonly string[] {
  return decision.kind === "categorize" && decision.counterpart !== null
    ? [decision.counterpart]
    : []
}

export interface Applied {
  readonly legs: readonly string[]
  readonly note: string | null
}

export async function applyDecision(
  rule: Rule,
  row: HistoryRow,
  decision: Decision
): Promise<Applied> {
  const category = await categoryMonarchId(categoryFrom(rule, row, decision))
  const legs = [row.monarchId, ...pairedLeg(decision)]
  for (const leg of legs) {
    await setCategory(leg, category, {
      source: "programmatic-categorization",
      decidedBy: rule.name,
    })
  }
  if (rule.note === null) return { legs, note: null }
  const auth = await monarchHeaders()
  const fetchDay = monarchClient(auth).transactions
  const outcome = await writeNoteIfEmpty(auth, fetchDay, row.monarchId, row.date, rule.note)
  return { legs, note: outcome.wrote ? rule.note : null }
}

if (import.meta.main) {
  const flags = readFlags(process.argv.slice(2))
  const monarchId = flags.get("transaction")?.[0]
  if (monarchId === undefined) throw new Error("name the transaction: --transaction <monarch-id>")
  const rule = await chosenRule(flags)
  const row = await readTransaction(monarchId)
  const decision = decide(rule, row, await readNeighbourhood(rule, row))
  const applied = await applyDecision(rule, row, decision)
  for (const leg of applied.legs) console.log(`categorized ${leg} by ${rule.name}`)
  if (rule.note !== null) {
    console.log(
      applied.note === null
        ? "note left standing: the row already carried one"
        : `note written: "${applied.note}"`
    )
  }
}
