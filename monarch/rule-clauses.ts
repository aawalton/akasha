
import { checkedAmountClause } from "./rule-amounts.ts"
import { checkedDateClauses, monthNumberFrom } from "./rule-dates.ts"
import type { Match, MatchComparison, MatchKey, Outcome, Rule } from "./rules.ts"
import { COMPARISONS_READ, MATCH_COMPARISONS, MATCH_KEYS } from "./rules.ts"

function checkedNote(rule: Rule): void {
  if (rule.note === null) return
  if (rule.note.trim() === "") {
    throw new Error(`rule "${rule.name}" carries an empty note, which writes a blank over nothing`)
  }
  if (rule.outcome.kind === "reserve") {
    throw new Error(
      `rule "${rule.name}" reserves for a person and carries a note. A reservation is never ` +
        "applied, so the note would never be written and nothing would report that it was not."
    )
  }
  if (rule.counterpart !== null) {
    throw new Error(
      `rule "${rule.name}" pairs a counterpart and carries a note. Applying it writes two legs ` +
        "and only the subject's date is held, so one leg would be annotated and one would not."
    )
  }
}

export function checkedRule(rule: Rule): Rule {
  if (rule.name.trim() === "") {
    throw new Error("a rule with no name can be neither reported on nor named as what decided")
  }
  if (
    rule.merchantIs.length === 0 &&
    rule.merchantContains.length === 0 &&
    rule.statementContains.length === 0 &&
    rule.descriptionContains.length === 0 &&
    rule.accountIs.length === 0
  ) {
    throw new Error(
      `rule "${rule.name}" narrows to nothing, so it matches every transaction there is. A ` +
        "`merchant` or an `account` clause is wanted, and a sign, an amount, " +
        "a counterpart or a date does not say which transactions the rule is about."
    )
  }
  const spec = rule.counterpart
  if (spec !== null && !(Number.isFinite(spec.withinDays) && spec.withinDays >= 0)) {
    throw new Error(`rule "${rule.name}" pairs over a window of ${spec.withinDays} days`)
  }
  checkedNote(rule)
  checkedAmountClause(rule.name, rule)
  checkedDateClauses(rule.name, rule)
  if (rule.outcome.kind === "categorize" && rule.outcome.category.trim() === "") {
    throw new Error(`rule "${rule.name}" says it categorizes and names no category`)
  }
  return rule
}

/** What a rule page states, before any of it is weighed. */
export interface StatedRule {
  readonly name: string
  readonly matches: readonly Match[]
  readonly categorySlug: string | null
  readonly ruleNote: string | null
  readonly counterpartWithinDays: number | null
}

function knownKey(at: string, key: unknown): MatchKey {
  if (typeof key === "string" && (MATCH_KEYS as readonly string[]).includes(key)) {
    return key as MatchKey
  }
  throw new Error(
    `${at}: \`${String(key)}\` is no match key. What a clause tests is one of ` +
      `${MATCH_KEYS.join(", ")}.`
  )
}

function knownComparison(at: string, key: MatchKey, comparison: unknown): MatchComparison {
  if (
    typeof comparison !== "string" ||
    !(MATCH_COMPARISONS as readonly string[]).includes(comparison)
  ) {
    throw new Error(
      `${at}: \`${String(comparison)}\` is no comparison. A clause compares by one of ` +
        `${MATCH_COMPARISONS.join(", ")}.`
    )
  }
  const read = COMPARISONS_READ[key]
  if (!read.includes(comparison as MatchComparison)) {
    throw new Error(
      `${at}: \`${key} ${comparison}\` — a comparison that key does not take, so the clause ` +
        `would be read by nothing and the rule would match more than it says. \`${key}\` takes ` +
        `${read.join(" or ")}.`
    )
  }
  return comparison as MatchComparison
}

/**
 * Read a page's `matches` list into the clauses `clausesMatch` weighs a transaction against.
 *
 * Nothing here skips a clause it does not understand. A clause read by nothing would leave the
 * rule running wider than the page says, which is the failure this refuses to make quietly.
 */
export function statedMatches(at: string, held: unknown): readonly Match[] {
  if (!Array.isArray(held)) {
    throw new Error(`${at}: \`matches\` is no list, so nothing says what this rule tests`)
  }
  const seen = new Set<string>()
  return held.map((one, i) => {
    const where = `${at} clause ${i + 1}`
    if (one === null || typeof one !== "object" || Array.isArray(one)) {
      throw new Error(`${where}: a clause is a key, a comparison and the values weighed against`)
    }
    const clause = one as Record<string, unknown>
    const key = knownKey(where, clause["key"])
    const comparison = knownComparison(where, key, clause["comparison"])
    const pair = `${key} ${comparison}`
    if (seen.has(pair)) {
      throw new Error(
        `${at}: two \`${pair}\` clauses. This reader keeps one of each, so the second would be ` +
          "dropped and the rule would run wider than the page says."
      )
    }
    seen.add(pair)
    const values = clause["values"]
    if (!Array.isArray(values) || values.some((value) => typeof value !== "string")) {
      throw new Error(`${where}: \`${pair}\` holds no list of words to weigh against`)
    }
    if (values.length === 0) {
      throw new Error(
        `${where}: \`${pair}\` holds nothing, so the clause weighs against nothing and the rule ` +
          "runs wider than the page says"
      )
    }
    return { key, comparison, values: values as readonly string[] }
  })
}

function valuesOf(matches: readonly Match[], key: MatchKey, comparison: MatchComparison) {
  return matches.find((one) => one.key === key && one.comparison === comparison)?.values ?? []
}

function oneOf(
  at: string,
  matches: readonly Match[],
  key: MatchKey,
  comparison: MatchComparison
): string | null {
  const values = valuesOf(matches, key, comparison)
  const only = values[0]
  if (only === undefined) return null
  if (values.length > 1) {
    throw new Error(`${at}: \`${key} ${comparison}\` takes one value, not ${values.length}`)
  }
  return only
}

function signOf(
  at: string,
  matches: readonly Match[],
  comparison: MatchComparison
): "positive" | "negative" | null {
  const only = oneOf(at, matches, "sign", comparison)
  if (only === null) return null
  if (only !== "positive" && only !== "negative") {
    throw new Error(`${at}: \`sign ${comparison}\` names positive or negative, not "${only}"`)
  }
  return only
}

function amountsOf(
  at: string,
  matches: readonly Match[],
  comparison: MatchComparison
): readonly number[] {
  return valuesOf(matches, "amount", comparison).map((text) => {
    const value = Number.parseFloat(text)
    if (!Number.isFinite(value)) throw new Error(`${at}: "${text}" is not an amount`)
    return value
  })
}

function monthsOf(
  at: string,
  matches: readonly Match[],
  comparison: MatchComparison
): readonly number[] {
  return valuesOf(matches, "month", comparison).map((name) => monthNumberFrom(name, at))
}

function counterpartOf(at: string, stated: number | null) {
  if (stated === null) return null
  if (!Number.isInteger(stated) || stated < 0) {
    throw new Error(`${at}: \`counterpartWithinDays: ${stated}\` is no count of days`)
  }
  return { withinDays: stated }
}

/**
 * Turn what one rule page states into a checked rule.
 *
 * A page naming no category reserves the transaction for a person, which is what the page type's
 * own invariant says a rule naming none does.
 */
export function ruleFromMatches(at: string, stated: StatedRule, outcome: Outcome): Rule {
  const matches = stated.matches
  if (matches.length === 0) {
    throw new Error(
      `${at}: this rule states no clause, so it matches every transaction there is. A rule that ` +
        "catches everything decides everything, and nothing here will guess what it meant."
    )
  }
  return checkedRule({
    name: stated.name,
    merchantIs: valuesOf(matches, "merchant", "is"),
    merchantContains: [],
    statementContains: [],
    descriptionContains: [],
    accountIs: valuesOf(matches, "account", "is"),
    accountIsNot: valuesOf(matches, "account", "is-not"),
    amountSign: signOf(at, matches, "is"),
    amountSignIsNot: signOf(at, matches, "is-not"),
    amountIs: amountsOf(at, matches, "is"),
    amountIsNot: amountsOf(at, matches, "is-not"),
    onOrAfter: oneOf(at, matches, "date", "on-or-after"),
    before: oneOf(at, matches, "date", "is-before"),
    monthIs: monthsOf(at, matches, "is"),
    monthIsNot: monthsOf(at, matches, "is-not"),
    counterpart: counterpartOf(at, stated.counterpartWithinDays),
    note: stated.ruleNote,
    outcome,
  })
}
