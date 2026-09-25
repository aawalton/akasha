import {
  type Condition,
  type FieldType,
  type RuleSet,
  typeOf,
} from "akasha/alan/harness/rules-engine/modules/rule-conditions/rule-conditions.module.code.ts"

export type Case = Readonly<Record<string, string>>

interface Literal {
  readonly test: string
  readonly value: string
}

interface Realiser {
  readonly holds: (literal: Literal, text: string) => boolean
}

const TEXT: Realiser = {
  holds: (literal, subject) => {
    switch (literal.test) {
      case "is":
        return subject === literal.value
      case "starts with":
        return subject.startsWith(literal.value)
      case "ends with":
        return subject.endsWith(literal.value)
      case "contains":
        return subject.includes(literal.value)
      default:
        return false
    }
  },
}

function asNumber(subject: string): number | null {
  const value = Number(subject)
  return Number.isFinite(value) ? value : null
}

const NUMERIC: Realiser = {
  holds: (literal, subject) => {
    const at = asNumber(subject)
    const value = asNumber(literal.value)
    if (at === null || value === null) return false
    if (literal.test === "is") return at === value
    if (literal.test === "is above") return at > value
    return false
  },
}

const CALENDAR: Realiser = {
  holds: (literal, subject) => {
    if (literal.test === "is") return subject === literal.value
    if (literal.test === "on or after") return subject >= literal.value
    return false
  },
}

const ENUMERATED: Realiser = {
  holds: (literal, subject) => literal.test === "is" && subject === literal.value,
}

const REALISERS: Readonly<Record<FieldType, Realiser | null>> = {
  text: TEXT,
  number: NUMERIC,
  date: CALENDAR,
  enum: ENUMERATED,
  list: null,
}

export function matches(ruleSet: RuleSet, conditions: readonly Condition[], at: Case): boolean {
  return conditions.every((condition) => {
    const type = typeOf(ruleSet, condition.field)
    if (type === null) return false
    const realiser = REALISERS[type]
    if (realiser === null) return false
    const subject = (at[condition.field] ?? "").toLowerCase()
    const any = condition.values.some((wanted) =>
      realiser.holds({ test: condition.test, value: wanted.toLowerCase() }, subject)
    )
    return condition.negated ? !any : any
  })
}
