export type FieldType = "text" | "number" | "date" | "enum" | "list"

export interface Field {
  readonly name: string
  readonly type: FieldType
  readonly values: readonly string[]
  readonly filler?: string
}

export const COMPARISONS: Readonly<Record<FieldType, readonly string[]>> = {
  text: ["is", "starts with", "ends with", "contains"],
  number: ["is", "is above"],
  date: ["is", "on or after"],
  enum: ["is"],
  list: ["contains"],
}

export const NEGATIONS: Readonly<Record<string, string>> = {
  is: "is not",
  "starts with": "does not start with",
  "ends with": "does not end with",
  contains: "does not contain",
  "is above": "is not above",
  "on or after": "is before",
}

export interface RuleKind {
  readonly glob: string
}

export interface Normalizer {
  readonly field: string
  readonly subject: string
  readonly path: string
}

export interface RuleSet {
  readonly name: string
  readonly fields: readonly Field[]
  readonly path: RegExp
  readonly normalizer: Normalizer | null
  readonly kinds: Readonly<Record<"code" | "agent", RuleKind | null>>
}

export interface RuleLocation {
  readonly holder: string | null
  readonly kind: string
  readonly slug: string
}

export function locationOf(ruleSet: RuleSet, relPath: string): RuleLocation | null {
  const found = ruleSet.path.exec(relPath)
  if (found === null) return null
  const groups: Record<string, string | undefined> = found.groups ?? {}
  return { holder: groups.holder ?? null, kind: groups.kind ?? "", slug: groups.slug ?? "" }
}

export function comparisonsOf(ruleSet: RuleSet): readonly string[] {
  const positive: string[] = []
  for (const field of ruleSet.fields) {
    for (const comparison of COMPARISONS[field.type]) {
      if (!positive.includes(comparison)) positive.push(comparison)
    }
  }
  const spellings: string[] = []
  for (const comparison of positive) {
    spellings.push(comparison)
    const negated = NEGATIONS[comparison]
    if (negated !== undefined) spellings.push(negated)
  }
  return spellings
}

export interface Condition<F extends string = string, T extends string = string> {
  readonly field: F
  readonly test: T
  readonly negated: boolean
  readonly values: readonly string[]
}

export interface Match<F extends string = string, T extends string = string> {
  readonly conditions: readonly Condition<F, T>[]
  readonly stray: number
}

interface Spelling {
  readonly test: string
  readonly negated: boolean
}

function spellingsOf(ruleSet: RuleSet): Map<string, Spelling> {
  const table = new Map<string, Spelling>()
  for (const field of ruleSet.fields) {
    for (const test of COMPARISONS[field.type]) {
      table.set(test, { test, negated: false })
      const negated = NEGATIONS[test]
      if (negated !== undefined) table.set(negated, { test, negated: true })
    }
  }
  return table
}

export function typeOf(ruleSet: RuleSet, name: string): FieldType | null {
  return ruleSet.fields.find((one) => one.name === name)?.type ?? null
}

export function comparisonsFor(ruleSet: RuleSet, name: string): readonly string[] {
  const type = typeOf(ruleSet, name)
  return type === null ? [] : COMPARISONS[type]
}

export function mispaired(
  ruleSet: RuleSet,
  conditions: readonly Condition[]
): readonly Condition[] {
  return conditions.filter((one) => !comparisonsFor(ruleSet, one.field).includes(one.test))
}

const VALUE = /^\s+-\s+`(.*)`\s*$/
const HEADING = /^#\s/

export function parseMatch(ruleSet: RuleSet, body: string): Match {
  const spellings = spellingsOf(ruleSet)
  const names = ruleSet.fields.map((one) => one.name).join("|")
  const ordered = [...spellings.keys()].sort((one, other) => other.length - one.length).join("|")
  const condition = new RegExp(`^-\\s+\\*\\*(${names})\\*\\*\\s+(${ordered})\\s*$`)

  const lines = body.replace(/\r\n/g, "\n").split("\n")
  const start = lines.findIndex((line) => line.trim() === "# Match")
  if (start === -1) return { conditions: [], stray: 0 }
  const found: { field: string; test: string; negated: boolean }[] = []
  const values: string[][] = []
  let stray = 0
  for (const line of lines.slice(start + 1)) {
    if (HEADING.test(line)) break
    if (line.trim() === "") continue
    const asCondition = condition.exec(line)
    if (asCondition !== null) {
      const spelling = spellings.get(asCondition[2] ?? "")
      if (spelling !== undefined) {
        found.push({ field: asCondition[1] ?? "", test: spelling.test, negated: spelling.negated })
        values.push([])
        continue
      }
    }
    const asValue = VALUE.exec(line)
    if (asValue !== null && values.length > 0) {
      values[values.length - 1]?.push(asValue[1] ?? "")
      continue
    }
    stray += 1
  }
  return { conditions: found.map((one, index) => ({ ...one, values: values[index] ?? [] })), stray }
}

function implies(
  type: FieldType,
  test: string,
  statedValue: string,
  wanted: string,
  statedTarget: string
): boolean {
  const value = statedValue.toLowerCase()
  const target = statedTarget.toLowerCase()
  switch (wanted) {
    case "contains":
      return type === "list" ? test === "contains" && value === target : value.includes(target)
    case "is":
      return test === "is" && value === target
    case "starts with":
      return (test === "is" || test === "starts with") && value.startsWith(target)
    case "ends with":
      return (test === "is" || test === "ends with") && value.endsWith(target)
    case "on or after":
      return test === "on or after" && value >= target
    case "is above":
      return test === "is above" && Number(value) >= Number(target)
    default:
      return false
  }
}

function excludes(
  type: FieldType,
  test: string,
  statedValue: string,
  wanted: string,
  statedTarget: string
): boolean {
  const value = statedValue.toLowerCase()
  const target = statedTarget.toLowerCase()
  if (type === "list") return false
  switch (test) {
    case "is":
      switch (wanted) {
        case "is":
          return value !== target
        case "starts with":
          return !value.startsWith(target)
        case "ends with":
          return !value.endsWith(target)
        case "contains":
          return !value.includes(target)
        default:
          return false
      }
    case "ends with":
      switch (wanted) {
        case "is":
          return !target.endsWith(value)
        case "ends with":
          return !value.endsWith(target) && !target.endsWith(value)
        default:
          return false
      }
    case "starts with":
      switch (wanted) {
        case "is":
          return !target.startsWith(value)
        case "starts with":
          return !value.startsWith(target) && !target.startsWith(value)
        default:
          return false
      }
    default:
      return false
  }
}

function forced(ruleSet: RuleSet, below: readonly Condition[], wanted: Condition): boolean {
  const type = typeOf(ruleSet, wanted.field)
  if (type === null) return false
  const sameField = below.filter((one) => one.field === wanted.field && one.values.length > 0)
  if (!wanted.negated) {
    return sameField.some(
      (one) =>
        !one.negated &&
        one.values.every((value) =>
          wanted.values.some((target) => implies(type, one.test, value, wanted.test, target))
        )
    )
  }
  return sameField.some((one) =>
    one.negated
      ? wanted.values.every((target) =>
          one.values.some((value) => implies(type, wanted.test, target, one.test, value))
        )
      : one.values.every((value) =>
          wanted.values.every((target) => excludes(type, one.test, value, wanted.test, target))
        )
  )
}

export function covers(
  ruleSet: RuleSet,
  above: readonly Condition[],
  below: readonly Condition[]
): boolean {
  return above.every((wanted) => forced(ruleSet, below, wanted))
}
