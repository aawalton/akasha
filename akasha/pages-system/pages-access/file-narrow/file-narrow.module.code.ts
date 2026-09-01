import type { Page, PageCondition, PageWhere } from "@akasha/pages-core/page-types"
import type { Test } from "@akasha/pages-system-service/asking"
import type { Json } from "@akasha/utils-narrow/json-value"
import { camelizeKey, kebabizeKey } from "../file-rows/file-rows.module.code.ts"
import type { PropertyDefinition } from "../page-type-config/page-type-config.module.code.ts"

export function declaredAs(key: string, definitions: readonly PropertyDefinition[]): string {
  const canonical = camelizeKey(key)
  return definitions.find((one) => one.id === canonical)?.key ?? kebabizeKey(key)
}

export function fieldFor(key: string, definitions: readonly PropertyDefinition[]): string {
  const canonical = camelizeKey(key)
  return definitions.some((one) => one.id === canonical) ? canonical : key
}

function textOf(value: unknown): string | null {
  if (value === null || value === undefined) return null
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return JSON.stringify(value)
}

export function ranked(left: unknown, right: unknown): number {
  const a = Number(left)
  const b = Number(right)
  if (Number.isFinite(a) && Number.isFinite(b) && left !== "" && right !== "") {
    return a === b ? 0 : a < b ? -1 : 1
  }
  const x = textOf(left) ?? ""
  const y = textOf(right) ?? ""
  return x === y ? 0 : x < y ? -1 : 1
}

function empty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === "string") return value === "" || value === "[]"
  return Array.isArray(value) && value.length === 0
}

function same(value: unknown, wanted: Json): boolean {
  if (wanted === null) return value === null || value === undefined
  if (Array.isArray(value)) return value.some((one) => same(one, wanted))
  return textOf(value) === textOf(wanted)
}

function holds(value: unknown, wanted: string): boolean {
  const text = textOf(value)
  return text?.toLowerCase().includes(wanted.toLowerCase()) === true
}

export function matches(
  page: Page,
  condition: PageCondition,
  definitions: readonly PropertyDefinition[] = []
): boolean {
  if ("or" in condition) return condition.or.some((one) => matches(page, one, definitions))
  const value = page[fieldFor(condition.key, definitions)]
  if ("eq" in condition) return same(value, condition.eq)
  if ("neq" in condition) return !same(value, condition.neq)
  if ("lt" in condition) return value != null && ranked(value, condition.lt) < 0
  if ("gt" in condition) return value != null && ranked(value, condition.gt) > 0
  if ("lte" in condition) return value != null && ranked(value, condition.lte) <= 0
  if ("gte" in condition) return value != null && ranked(value, condition.gte) >= 0
  if ("isNull" in condition) return value === null || value === undefined
  if ("in" in condition) return condition.in.some((one) => same(value, one))
  if ("notIn" in condition) return !condition.notIn.some((one) => same(value, one))
  if ("contains" in condition) return holds(value, condition.contains)
  if ("notContains" in condition) return !holds(value, condition.notContains)
  if ("includes" in condition) {
    return Array.isArray(value) ? value.some((one) => same(one, condition.includes)) : false
  }
  if ("isEmpty" in condition) return empty(value)
  return !empty(value)
}

const SETTLED_BY_THE_REPO: ReadonlySet<string> = new Set(["userId"])

export type AskedNarrows = {
  readonly where: PageWhere | undefined
  readonly dropped: readonly string[]
}

type NarrowedCondition = {
  readonly kept: PageCondition | null
  readonly dropped: readonly string[]
}

function askableNarrow(condition: PageCondition, ownerSlug: string | null): NarrowedCondition {
  if ("or" in condition) {
    const legs: PageCondition[] = []
    const dropped: string[] = []
    for (const one of condition.or) {
      const got = askableNarrow(one, ownerSlug)
      if (got.kept !== null) legs.push(got.kept)
      for (const key of got.dropped) dropped.push(key)
    }
    return { kept: legs.length === 0 ? null : { or: legs }, dropped }
  }
  if (!SETTLED_BY_THE_REPO.has(condition.key)) return { kept: condition, dropped: [] }
  if (ownerSlug !== null) {
    return { kept: { ...condition, key: camelizeKey(ownerSlug) }, dropped: [] }
  }
  return { kept: null, dropped: [condition.key] }
}

export function askableNarrows(
  where: PageWhere | undefined,
  ownerSlug: string | null
): AskedNarrows {
  if (where === undefined) return { where: undefined, dropped: [] }
  const kept: PageCondition[] = []
  const dropped: string[] = []
  for (const one of where) {
    const got = askableNarrow(one, ownerSlug)
    if (got.kept !== null) kept.push(got.kept)
    for (const key of got.dropped) dropped.push(key)
  }
  const untouched = kept.length === where.length && kept.every((one, at) => one === where[at])
  return { where: untouched ? where : kept, dropped }
}

export function narrowing(
  where: PageWhere | undefined,
  definitions: readonly PropertyDefinition[] = []
): Readonly<Record<string, Test>> | null {
  if (where === undefined || where.length === 0) return null
  const tests: Record<string, Test> = {}
  for (const condition of where) {
    if ("or" in condition) continue
    const key = declaredAs(condition.key, definitions)
    if (key in tests) continue
    if ("eq" in condition && typeof condition.eq === "string") tests[key] = { is: condition.eq }
    else if ("in" in condition && condition.in.every((one) => typeof one === "string")) {
      tests[key] = { in: condition.in }
    } else if ("notIn" in condition && condition.notIn.every((one) => typeof one === "string")) {
      tests[key] = { "not-in": condition.notIn }
    } else if ("includes" in condition && typeof condition.includes === "string") {
      tests[key] = { has: condition.includes }
    } else if ("isNotEmpty" in condition) tests[key] = { empty: false }
  }
  return Object.keys(tests).length === 0 ? null : tests
}
