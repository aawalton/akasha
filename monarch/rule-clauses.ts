
import { checkedAmountClause } from "./rule-amounts.ts"
import { checkedDateClauses } from "./rule-dates.ts"
import type { Rule } from "./rules.ts"

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
      `rule "${rule.name}" narrows to nothing, so it matches every transaction there is. One of ` +
        "merchantIs and accountIs is wanted, and a sign, an amount, " +
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
