import {
  type Condition,
  type Field,
  type FieldType,
  type RuleSet,
  typeOf,
} from "../rule-conditions/rule-conditions.module.code.ts"

export const CEILING = 500_000

export interface Matchable {
  readonly relPath: string
  readonly conditions: readonly Condition[]
}

export type Case = Readonly<Record<string, string>>

export interface Literal {
  readonly test: string
  readonly value: string
}

export interface Reading {
  readonly cases: number
  readonly restricted: boolean
}

interface Realiser {
  readonly holds: (literal: Literal, text: string) => boolean
  readonly witness: (
    spare: string,
    chosen: readonly Literal[],
    pool: readonly Literal[]
  ) => string | null
  readonly outside: (
    field: Field,
    pool: readonly Literal[],
    holds: Realiser["holds"]
  ) => readonly string[] | null
  readonly reach: (pool: readonly Literal[]) => number
}

const SPARE = "~^qxzjkv"

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
  witness: (spare, chosen) => {
    const valuesOf = (test: string): readonly string[] =>
      chosen.filter((one) => one.test === test).map((one) => one.value)
    const longest = (values: readonly string[]): string =>
      values.reduce((one, other) => (other.length > one.length ? other : one), "")
    const equals = [...new Set(valuesOf("is"))]
    if (equals.length > 1) return null
    if (equals.length === 1) return equals[0] as string
    const prefixes = valuesOf("starts with")
    const suffixes = valuesOf("ends with")
    const head = longest(prefixes)
    const tail = longest(suffixes)
    if (prefixes.some((one) => !head.startsWith(one))) return null
    if (suffixes.some((one) => !tail.endsWith(one))) return null
    return [head, ...valuesOf("contains"), tail].join(spare)
  },
  outside: (field, pool, holds) => {
    const clear = (subject: string): boolean => pool.every((one) => !holds(one, subject))
    const seeded = field.filler ?? " ~ "
    if (clear(seeded)) return [seeded]
    for (const one of SPARE) {
      const made = one.repeat(8)
      if (clear(made)) return [made]
    }
    return null
  },
  reach: (pool) => {
    const free = pool.filter((one) => one.test === "contains").length
    return free > 30 ? Number.MAX_SAFE_INTEGER : pool.length + 2 ** free
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
  witness: (_spare, chosen, pool) => {
    const equals: number[] = []
    const floors: number[] = []
    for (const one of chosen) {
      const value = asNumber(one.value)
      if (value === null) return null
      if (one.test === "is") equals.push(value)
      else if (one.test === "is above") floors.push(value)
      else return null
    }
    const named = [...new Set(equals)]
    if (named.length > 1) return null
    const only = named[0]
    if (only !== undefined) return floors.every((floor) => only > floor) ? String(only) : null
    if (floors.length === 0) return null
    const top = Math.max(...floors)
    const higher = pool
      .map((one) => asNumber(one.value))
      .filter((one): one is number => one !== null && one > top)
    const next = higher.length === 0 ? top + 1 : Math.min(...higher)
    return String(top + (next - top) / 2)
  },
  outside: (_field, pool) => {
    const values = pool
      .map((one) => asNumber(one.value))
      .filter((one): one is number => one !== null)
    return [String(values.length === 0 ? 0 : Math.min(...values) - 1)]
  },
  reach: (pool) => pool.length + 2,
}

const EARLY = ["0001-01-01", "0000-01-01"]

const CALENDAR: Realiser = {
  holds: (literal, subject) => {
    if (literal.test === "is") return subject === literal.value
    if (literal.test === "on or after") return subject >= literal.value
    return false
  },
  witness: (_spare, chosen) => {
    const equals: string[] = []
    const floors: string[] = []
    for (const one of chosen) {
      if (one.test === "is") equals.push(one.value)
      else if (one.test === "on or after") floors.push(one.value)
      else return null
    }
    const named = [...new Set(equals)]
    if (named.length > 1) return null
    const only = named[0]
    if (only !== undefined) return floors.every((floor) => only >= floor) ? only : null
    if (floors.length === 0) return null
    return floors.reduce((one, other) => (other > one ? other : one))
  },
  outside: (_field, pool, holds) => {
    for (const candidate of EARLY) {
      if (pool.every((one) => !holds(one, candidate))) return [candidate]
    }
    return null
  },
  reach: (pool) => pool.length + 1,
}

const ENUMERATED: Realiser = {
  holds: (literal, subject) => literal.test === "is" && subject === literal.value,
  witness: (_spare, chosen) => {
    const named = new Set<string>()
    for (const one of chosen) {
      if (one.test !== "is") return null
      named.add(one.value)
    }
    return named.size === 1 ? ([...named][0] as string) : null
  },
  outside: (field, pool) => {
    if (field.values.length === 0) return null
    const named = new Set(pool.map((one) => one.value))
    const rest = field.values.map((one) => one.toLowerCase()).filter((one) => !named.has(one))
    const first = rest[0]
    return first === undefined ? [] : [first]
  },
  reach: (pool) => pool.length + 1,
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

function literalsOf(rules: readonly Matchable[], name: string): readonly Literal[] {
  const found = new Map<string, Literal>()
  for (const rule of rules) {
    for (const condition of rule.conditions) {
      if (condition.field !== name) continue
      for (const value of condition.values) {
        found.set(`${condition.test} ${value.toLowerCase()}`, {
          test: condition.test,
          value: value.toLowerCase(),
        })
      }
    }
  }
  return [...found.values()].sort((one, other) =>
    `${one.test} ${one.value}` < `${other.test} ${other.value}` ? -1 : 1
  )
}

function keyOf(realiser: Realiser, pool: readonly Literal[], subject: string): string {
  return pool.map((one) => (realiser.holds(one, subject) ? "1" : "0")).join("")
}

function markOf(pool: readonly Literal[], chosen: readonly Literal[]): string {
  return pool.map((one) => (chosen.includes(one) ? "1" : "0")).join("")
}

function answersTo(
  realiser: Realiser,
  field: Field,
  pool: readonly Literal[],
  ceiling: number
): readonly string[] | null {
  const outside = realiser.outside(field, pool, realiser.holds)
  if (outside === null) return null
  const spare = outside[0] ?? ""
  const found = new Map<string, string>()
  for (const one of outside) found.set(keyOf(realiser, pool, one), one)
  const queue: (readonly Literal[])[] = [[]]
  const walked = new Set<string>([markOf(pool, [])])
  while (queue.length > 0) {
    const chosen = queue.shift() as readonly Literal[]
    for (const one of pool) {
      if (chosen.includes(one)) continue
      const next = [...chosen, one]
      const mark = markOf(pool, next)
      if (walked.has(mark)) continue
      walked.add(mark)
      const subject = realiser.witness(spare, next, pool)
      if (subject === null) continue
      const key = keyOf(realiser, pool, subject)
      if (!found.has(key)) {
        if (found.size >= ceiling) return null
        found.set(key, subject)
      }
      if (key === mark) queue.push(next)
    }
  }
  return [...found.values()]
}

export function eachCase(
  ruleSet: RuleSet,
  rules: readonly Matchable[],
  decide: (at: Case, conditions: readonly Condition[]) => boolean,
  visit: (at: Case, matched: readonly Matchable[]) => void,
  ceiling: number = CEILING
): Reading {
  const norm = ruleSet.normalizer
  const tested = (name: string): boolean =>
    rules.some((rule) => rule.conditions.some((condition) => condition.field === name))
  if (norm !== null && tested(norm.subject)) return { cases: 0, restricted: true }
  const carried = norm === null ? null : norm.subject
  const fields = ruleSet.fields.filter((field) => field.name !== carried)
  const pools = new Map<string, readonly Literal[]>(
    fields.map((field) => [field.name, literalsOf(rules, field.name)])
  )
  const realiserFor = (field: Field): Realiser | null => REALISERS[field.type]
  const costOf = (field: Field): number => {
    const realiser = realiserFor(field)
    return realiser === null ? Number.MAX_SAFE_INTEGER : realiser.reach(pools.get(field.name) ?? [])
  }
  const order = [...fields].sort((one, other) => costOf(one) - costOf(other))
  const empty: Record<string, string> = {}
  for (const field of ruleSet.fields) empty[field.name] = ""

  let cases = 0
  let restricted = false

  const walk = (
    depth: number,
    alive: readonly Matchable[],
    at: Record<string, string>
  ): undefined => {
    if (restricted) return undefined
    if (depth === order.length) {
      cases += 1
      visit(
        at,
        rules.filter((rule) => decide(at, rule.conditions))
      )
      return undefined
    }
    const field = order[depth] as Field
    const realiser = realiserFor(field)
    if (realiser === null) {
      restricted = true
      return undefined
    }
    const asked = (pools.get(field.name) ?? []).filter((literal) =>
      alive.some((rule) =>
        rule.conditions.some(
          (condition) =>
            condition.field === field.name &&
            condition.test === literal.test &&
            condition.values.some((value) => value.toLowerCase() === literal.value)
        )
      )
    )
    const answers = answersTo(realiser, field, asked, ceiling)
    if (answers === null) {
      restricted = true
      return undefined
    }
    for (const subject of answers) {
      if (restricted) return undefined
      if (cases >= ceiling) {
        restricted = true
        return undefined
      }
      const next = { ...at, [field.name]: subject }
      walk(
        depth + 1,
        alive.filter((rule) =>
          decide(
            next,
            rule.conditions.filter((condition) => condition.field === field.name)
          )
        ),
        next
      )
    }
  }

  walk(0, rules, empty)
  return { cases, restricted }
}
