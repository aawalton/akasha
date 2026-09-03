
import type { AmountClause } from "./rule-amounts.ts"
import { amountClauseMatches } from "./rule-amounts.ts"
import type { DateClauses } from "./rule-dates.ts"
import { dateClausesMatch } from "./rule-dates.ts"
import { merchantOf } from "./merchant.ts"
import type { Subject } from "./transaction.ts"
import { accountKey, cents, dayGap, descriptionOf } from "./transaction.ts"

/**
 * What a rule page states it tests, as the pages carry it since the rules moved into akasha.
 * The keys and comparisons are the two select properties' own values, declared at
 * `akasha/alan/harness/monarch/category-rules/properties/match-key.select-property.ts` and
 * `.../match-comparison.select-property.ts`. A page holding a word outside these lists is refused
 * rather than skipped, so a select property gaining a value here is a loud failure.
 */
export const MATCH_KEYS = ["merchant", "sign", "account", "amount", "month", "date"] as const

export type MatchKey = (typeof MATCH_KEYS)[number]

export const MATCH_COMPARISONS = ["is", "is-not", "on-or-after", "is-before"] as const

export type MatchComparison = (typeof MATCH_COMPARISONS)[number]

export interface Match {
  readonly key: MatchKey
  readonly comparison: MatchComparison
  readonly values: readonly string[]
}

/** Every comparison this reader consumes, by the key it is stated against. */
export const COMPARISONS_READ: Readonly<Record<MatchKey, readonly MatchComparison[]>> = {
  merchant: ["is"],
  sign: ["is", "is-not"],
  account: ["is", "is-not"],
  amount: ["is", "is-not"],
  month: ["is", "is-not"],
  date: ["on-or-after", "is-before"],
}

export type Outcome =
  | { readonly kind: "categorize"; readonly category: string }
  | { readonly kind: "reserve" }

export interface CounterpartSpec {
  readonly withinDays: number
}

export interface Rule extends DateClauses, AmountClause {
  readonly name: string
  readonly merchantIs: readonly string[]
  readonly merchantContains: readonly string[]
  readonly statementContains: readonly string[]
  readonly descriptionContains: readonly (readonly string[])[]
  readonly accountIs: readonly string[]
  readonly accountIsNot: readonly string[]
  readonly amountSign: "positive" | "negative" | null
  readonly amountSignIsNot: "positive" | "negative" | null
  readonly counterpart: CounterpartSpec | null
  readonly note: string | null
  readonly outcome: Outcome
}

export type Ambiguity = "several counterparts" | "counterpart contended"

export type Decision =
  | { readonly kind: "no-match" }
  | {
      readonly kind: "categorize"
      readonly category: string
      readonly counterpart: string | null
    }
  | { readonly kind: "reserve"; readonly counterpart: string | null }
  | { readonly kind: "unpaired" }
  | {
      readonly kind: "ambiguous"
      readonly why: Ambiguity
      readonly candidates: readonly string[]
    }

function holds(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

function any(haystack: string, needles: readonly string[]): boolean {
  return needles.length === 0 || needles.some((needle) => holds(haystack, needle))
}

export function clausesMatch(rule: Rule, against: Subject): boolean {
  if (rule.merchantIs.length > 0) {
    const found = merchantOf(against)
    if (!rule.merchantIs.some((named) => named.toLowerCase() === found)) return false
  }
  if (!any(against.merchant, rule.merchantContains)) return false
  if (!any(against.statement, rule.statementContains)) return false
  const description = descriptionOf(against)
  for (const group of rule.descriptionContains) {
    if (!any(description, group)) return false
  }
  if (rule.accountIs.length > 0) {
    const key = accountKey(against.account)
    if (!rule.accountIs.some((named) => accountKey(named) === key)) return false
  }
  if (rule.accountIsNot.length > 0) {
    const key = accountKey(against.account)
    if (rule.accountIsNot.some((named) => accountKey(named) === key)) return false
  }
  if (rule.amountSign === "positive" && cents(against.amount) <= 0) return false
  if (rule.amountSign === "negative" && cents(against.amount) >= 0) return false
  if (rule.amountSignIsNot === "positive" && cents(against.amount) > 0) return false
  if (rule.amountSignIsNot === "negative" && cents(against.amount) < 0) return false
  if (!amountClauseMatches(rule, against.amount)) return false
  return dateClausesMatch(rule, against.date)
}

export function isCounterpart(spec: CounterpartSpec, subject: Subject, other: Subject): boolean {
  if (cents(other.amount) !== -cents(subject.amount)) return false
  if (accountKey(other.account) === accountKey(subject.account)) return false
  return dayGap(other.date, subject.date) <= spec.withinDays
}

export function bearsOn(rule: Rule, subject: Subject, other: Subject): boolean {
  if (rule.counterpart === null) return false
  if (Math.abs(cents(other.amount)) !== Math.abs(cents(subject.amount))) return false
  return dayGap(other.date, subject.date) <= 2 * rule.counterpart.withinDays
}

export function neighbourhoodIn<T extends Subject>(
  rule: Rule,
  subject: Subject,
  rows: readonly T[]
): readonly T[] {
  if (rule.counterpart === null) return []
  return rows.filter((row) => bearsOn(rule, subject, row))
}

export function neighbourhoods<T extends Subject>(
  rows: readonly T[]
): (rule: Rule, subject: Subject) => readonly T[] {
  const byAmount = new Map<number, T[]>()
  for (const row of rows) {
    const key = Math.abs(cents(row.amount))
    const held = byAmount.get(key)
    if (held === undefined) byAmount.set(key, [row])
    else held.push(row)
  }
  return (rule, subject) => {
    if (rule.counterpart === null) return []
    const bucket = byAmount.get(Math.abs(cents(subject.amount))) ?? []
    return bucket.filter((row) => bearsOn(rule, subject, row))
  }
}

function fired(outcome: Outcome, counterpart: string | null): Decision {
  return outcome.kind === "reserve"
    ? { kind: "reserve", counterpart }
    : { kind: "categorize", category: outcome.category, counterpart }
}

export function decide(rule: Rule, subject: Subject, near: readonly Subject[]): Decision {
  if (!clausesMatch(rule, subject)) return { kind: "no-match" }
  const spec = rule.counterpart
  if (spec === null) return fired(rule.outcome, null)

  const candidates = near.filter((row) => isCounterpart(spec, subject, row))
  if (candidates.length === 0) return { kind: "unpaired" }
  if (candidates.length > 1) {
    return {
      kind: "ambiguous",
      why: "several counterparts",
      candidates: candidates.map((row) => row.monarchId),
    }
  }
  const only = candidates[0]
  if (only === undefined) throw new Error("a candidate list of one held nothing at zero")

  const rivals = near.filter(
    (row) =>
      row.monarchId !== subject.monarchId &&
      clausesMatch(rule, row) &&
      isCounterpart(spec, row, only)
  )
  if (rivals.length > 0) {
    return {
      kind: "ambiguous",
      why: "counterpart contended",
      candidates: [subject.monarchId, ...rivals.map((row) => row.monarchId)],
    }
  }
  return fired(rule.outcome, only.monarchId)
}

export function fires(decision: Decision): boolean {
  return decision.kind === "categorize" || decision.kind === "reserve"
}
