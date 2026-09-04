import { createHash } from "node:crypto"
import type { HistoryRow } from "../history/monarch-history.module.code.ts"
import type { Rule } from "../rules/monarch-rules.module.code.ts"
import { decide, fires, neighbourhoods } from "../rules/monarch-rules.module.code.ts"
import { answered } from "../transaction/monarch-transaction.module.code.ts"

export type Stratum = "PAYEE" | "FLOW" | "ENVELOPE-PERSON" | "ENVELOPE-OCCASION"

export const STRATA: readonly Stratum[] = ["PAYEE", "FLOW", "ENVELOPE-PERSON", "ENVELOPE-OCCASION"]

const STRATUM_OF: ReadonlyMap<string, Stratum> = new Map([
  ["Auto", "PAYEE"],
  ["Fast Offering", "PAYEE"],
  ["Financial", "PAYEE"],
  ["Medical", "PAYEE"],
  ["Mortgage", "PAYEE"],
  ["Paychecks", "PAYEE"],
  ["Phone", "PAYEE"],
  ["Savings", "PAYEE"],
  ["Tithing", "PAYEE"],
  ["Transportation", "PAYEE"],
  ["Utilities", "PAYEE"],

  ["Transfer", "FLOW"],
  ["Other Income", "FLOW"],
  ["Jenny's Holding", "FLOW"],
  ["Rick Walton Trust", "FLOW"],
  ["Latitude", "FLOW"],

  ["Alan's Spending", "ENVELOPE-PERSON"],
  ["Jenny's Spending", "ENVELOPE-PERSON"],
  ["Joseph's Spending", "ENVELOPE-PERSON"],
  ["Katara's Spending", "ENVELOPE-PERSON"],
  ["Lizzy's Spending", "ENVELOPE-PERSON"],
  ["Jenny's Travel", "ENVELOPE-PERSON"],
  ["Jenny's Learning", "ENVELOPE-PERSON"],
  ["Joseph's Tithing", "ENVELOPE-PERSON"],
  ["Katara’s Tithing", "ENVELOPE-PERSON"],
  ["Lizzy's Tithing", "ENVELOPE-PERSON"],
  ["Joseph Doing Good", "ENVELOPE-PERSON"],
  ["Katara’s Doing Good", "ENVELOPE-PERSON"],
  ["Lizzy Doing Good", "ENVELOPE-PERSON"],
  ["Parental (Ann) Doing Good", "ENVELOPE-PERSON"],
  ["Joseph's Long-term", "ENVELOPE-PERSON"],
  ["Joseph's Short-term", "ENVELOPE-PERSON"],
  ["Katara's Long-term", "ENVELOPE-PERSON"],
  ["Katara's Short-term", "ENVELOPE-PERSON"],
  ["Lizzy's Long-term", "ENVELOPE-PERSON"],
  ["Lizzy's Short-term", "ENVELOPE-PERSON"],

  ["Shopping", "ENVELOPE-OCCASION"],
  ["Family Travel", "ENVELOPE-OCCASION"],
  ["Alan & Jenny Travel", "ENVELOPE-OCCASION"],
  ["Doing Good", "ENVELOPE-OCCASION"],
  ["Date", "ENVELOPE-OCCASION"],
  ["Kids Learning", "ENVELOPE-OCCASION"],
  ["House", "ENVELOPE-OCCASION"],
  ["Christmas", "ENVELOPE-OCCASION"],
  ["Entrepreneurship", "ENVELOPE-OCCASION"],
])

export function stratumOf(category: string): Stratum {
  const stratum = STRATUM_OF.get(category)
  if (stratum === undefined) {
    throw new Error(
      `category "${category}" belongs to no declared stratum. Classify it in the monarch-eval-population module ` +
        "before it can be reported on; a default would report it as something nobody decided."
    )
  }
  return stratum
}

export type Pool = "DEV" | "HOLDOUT"

export function poolOf(monarchId: string): Pool {
  const digest = createHash("sha256").update(monarchId).digest("hex")
  const last = digest.charAt(digest.length - 1)
  return "01234567".includes(last) ? "DEV" : "HOLDOUT"
}

const SAMPLE_SALT = "18119-sample"

function sampleKey(monarchId: string): string {
  return createHash("sha256").update(`${SAMPLE_SALT}:${monarchId}`).digest("hex")
}

export interface Candidate {
  readonly row: HistoryRow
  readonly stratum: Stratum
  readonly pool: Pool
}

export interface Population {
  readonly total: number
  readonly ruleReached: number
  readonly unanswered: number
  readonly scorable: readonly Candidate[]
}

export function population(history: readonly HistoryRow[], rules: readonly Rule[]): Population {
  const near = neighbourhoods(history)
  let ruleReached = 0
  let unanswered = 0
  const scorable: Candidate[] = []
  for (const row of history) {
    if (rules.some((rule) => fires(decide(rule, row, near(rule, row))))) {
      ruleReached += 1
      continue
    }
    if (!answered(row.standingCategory)) {
      unanswered += 1
      continue
    }
    scorable.push({ row, stratum: stratumOf(row.standingCategory), pool: poolOf(row.monarchId) })
  }
  return { total: history.length, ruleReached, unanswered, scorable }
}

export function draw(
  candidates: readonly Candidate[],
  pool: Pool,
  perStratum: number
): readonly Candidate[] {
  const drawn: Candidate[] = []
  for (const stratum of STRATA) {
    const eligible = candidates
      .filter((c) => c.pool === pool && c.stratum === stratum)
      .sort((a, b) => sampleKey(a.row.monarchId).localeCompare(sampleKey(b.row.monarchId)))
    drawn.push(...eligible.slice(0, perStratum))
  }
  return drawn
}
