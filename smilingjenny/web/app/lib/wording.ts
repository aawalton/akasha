import { z } from "zod"

const FIELD_WORDS: Readonly<Record<string, string>> = {
  merchant: "the shop's name",
  statement: "the line on the bank statement",
  description: "the line on the bank statement",
  account: "the account it went through",
  amount: "the amount",
  sign: "the amount's sign",
  date: "the date",
  month: "the month",
}

const TEST_WORDS: Readonly<Record<string, { readonly plain: string; readonly denied: string }>> = {
  is: { plain: "is", denied: "is not" },
  "starts with": { plain: "starts with", denied: "does not start with" },
  "ends with": { plain: "ends with", denied: "does not end with" },
  contains: { plain: "contains", denied: "does not contain" },
  "is above": { plain: "is above", denied: "is not above" },
  "on or after": { plain: "is on or after", denied: "is before" },
}

const DENIALS: Readonly<Record<string, string>> = {
  "is not": "is",
  "does not start with": "starts with",
  "does not end with": "ends with",
  "does not contain": "contains",
  "is not above": "is above",
  "is before": "on or after",
}

const MATCH_HEADING = "# Match"
const HEADING = /^#\s/
const CONDITION = /^-\s+\*\*([^*]+)\*\*\s+(.+?)\s*$/
const VALUE = /^\s+-\s+`(.*)`\s*$/

const VALUE_CAPTURE = z.tuple([z.string(), z.string()])
const CONDITION_CAPTURE = z.tuple([z.string(), z.string(), z.string()])

function parseValueLine(line: string): string | null {
  const captured = VALUE_CAPTURE.safeParse(VALUE.exec(line))
  return captured.success ? captured.data[1] : null
}

interface SpelledCondition {
  readonly field: string
  readonly spelled: string
}

function parseConditionLine(line: string): SpelledCondition | null {
  const captured = CONDITION_CAPTURE.safeParse(CONDITION.exec(line))
  if (!captured.success) return null
  return { field: captured.data[1].trim(), spelled: captured.data[2].trim() }
}

export interface RuleCondition {
  readonly field: string
  readonly test: string
  readonly negated: boolean
  readonly values: readonly string[]
}

function withValue(condition: RuleCondition, value: string): RuleCondition {
  return { ...condition, values: [...condition.values, value] }
}

export function parseRuleMatch(body: string): readonly RuleCondition[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n")
  const start = lines.findIndex((line) => line.trim() === MATCH_HEADING)
  if (start === -1) return []

  const found: RuleCondition[] = []
  for (const line of lines.slice(start + 1)) {
    if (HEADING.test(line)) break
    if (line.trim() === "") continue

    const value = parseValueLine(line)
    if (value !== null) {
      const last = found.at(-1)
      if (last !== undefined) found[found.length - 1] = withValue(last, value)
      continue
    }

    const condition = parseConditionLine(line)
    if (condition === null) continue
    const denied = DENIALS[condition.spelled]
    found.push({
      field: condition.field,
      test: denied ?? condition.spelled,
      negated: denied !== undefined,
      values: [],
    })
  }
  return found
}

export interface RuleConditions {
  readonly conditions: readonly RuleCondition[]
}

export interface RuleOutcome {
  readonly categoryName: string | null
  readonly reserveForPerson: boolean
}

export interface CategorySource {
  readonly source: string
  readonly decidedBy: string | null
}

function isSet(value: string | null): value is string {
  return value !== null && value !== ""
}

function quoted(values: readonly string[]): string {
  const marked = values.map((value) => `“${value}”`)
  const last = marked.at(-1)
  if (last === undefined) return ""
  if (marked.length === 1) return last
  return `${marked.slice(0, -1).join(", ")} or ${last}`
}

function fieldWords(field: string): string {
  return FIELD_WORDS[field] ?? `the ${field}`
}

function testWords(test: string, negated: boolean): string {
  const words = TEST_WORDS[test]
  if (words === undefined) return negated ? `does not ${test}` : test
  return negated ? words.denied : words.plain
}

export function ruleConditions(rule: RuleConditions): readonly string[] {
  return rule.conditions
    .filter((condition) => condition.values.some((value) => value !== ""))
    .map(
      (condition) =>
        `${fieldWords(condition.field)} ${testWords(condition.test, condition.negated)} ${quoted(
          condition.values.filter((value) => value !== "")
        )}`
    )
}

export function ruleOutcomes(rule: RuleOutcome): readonly string[] {
  const outcomes: string[] = []
  if (isSet(rule.categoryName)) outcomes.push(`it goes under ${rule.categoryName}`)
  if (rule.reserveForPerson) {
    outcomes.push("a person settles it, rather than anything settling it automatically")
  }
  return outcomes
}

export function categorySourceSentence(provenance: CategorySource | null): string {
  if (provenance === null) return "Where this category came from was not recorded."
  const { source, decidedBy } = provenance
  switch (source) {
    case "programmatic-categorization":
      return decidedBy === null
        ? "Set by a rule. The rule was not named."
        : `Set by the rule “${decidedBy}”.`
    case "semantic-categorization":
      return decidedBy === null
        ? "Worked out from what this looked like. Nobody was named."
        : `Worked out by ${decidedBy} from what this looked like.`
    case "manual-categorization":
      return decidedBy === null
        ? "A person said what this was. Which person was not recorded."
        : `${decidedBy} said what this was.`
    case "monarch":
      return decidedBy === null
        ? "It arrived from Monarch already categorized, and Monarch does not record who chose it."
        : `It arrived from Monarch already categorized, set by ${decidedBy}.`
    default:
      return decidedBy === null
        ? "Where this category came from was recorded, but not in words this page knows yet."
        : `Set by ${decidedBy}.`
  }
}
