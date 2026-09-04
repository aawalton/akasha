import type { PageCondition, PageWhere } from "@akasha/pages-core/page-types"
import { isBlocksValueEmpty } from "@akasha/pages-core/property-types/rich-document"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import { pageHasNonEmptyContentKey } from "@akasha/pages-core/schema/content-tier"
import { asRecord } from "../../collection/page-row/page-row.module.code.ts"

function asPropertyValue(v: unknown): PropertyValue {
  return v as PropertyValue
}

export type ResolvedOverlay = Readonly<Record<string, number | null>>

const isNullish = (v: unknown): boolean => v === undefined || v === null
const isPresent = (v: unknown): boolean => v !== undefined && v !== null

function jsonEquals(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false
  const aArr = Array.isArray(a)
  if (aArr !== Array.isArray(b)) return false
  if (aArr && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => jsonEquals(x, b[i]))
  }
  const ao = asRecord(a)
  const bo = asRecord(b)
  const ak = Object.keys(ao)
  return (
    ak.length === Object.keys(bo).length && ak.every((k) => k in bo && jsonEquals(ao[k], bo[k]))
  )
}

function cmp(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a < b ? -1 : a > b ? 1 : 0
  if (typeof a === "string" && typeof b === "string") return a < b ? -1 : a > b ? 1 : 0
  if (typeof a === "boolean" && typeof b === "boolean") return a === b ? 0 : a ? 1 : -1
  return Number.NaN
}

function textOf(v: unknown): string | null {
  if (!isPresent(v)) return null
  if (typeof v === "string") return v
  if (typeof v === "number" || typeof v === "boolean") return String(v)
  return null
}

function effectiveLhs(
  page: Readonly<Record<string, unknown>>,
  resolved: ResolvedOverlay,
  materializedKeys: ReadonlySet<string>,
  key: string
): unknown {
  if (key in resolved) return resolved[key]
  const v = page[key]
  return v === undefined && materializedKeys.has(key) ? null : v
}

function matchCondition(
  page: Readonly<Record<string, unknown>>,
  resolved: ResolvedOverlay,
  materializedKeys: ReadonlySet<string>,
  contentKeys: ReadonlySet<string>,
  richDocumentKeys: ReadonlySet<string>,
  cond: PageCondition
): boolean {
  if ("or" in cond) {
    if (cond.or.length === 0) throw new Error("view-match: empty 'or' disjunction is not supported")
    return cond.or.some((arm) =>
      matchCondition(page, resolved, materializedKeys, contentKeys, richDocumentKeys, arm)
    )
  }
  const lhs = effectiveLhs(page, resolved, materializedKeys, cond.key)

  if ("eq" in cond) {
    if (cond.eq === null) return isNullish(lhs)
    return jsonEquals(lhs, cond.eq)
  }
  if ("neq" in cond) {
    if (cond.neq === null) return isPresent(lhs)
    return lhs !== undefined && !jsonEquals(lhs, cond.neq)
  }
  if ("lt" in cond) return isPresent(lhs) && cmp(lhs, cond.lt) < 0
  if ("gt" in cond) return isPresent(lhs) && cmp(lhs, cond.gt) > 0
  if ("lte" in cond) return isPresent(lhs) && cmp(lhs, cond.lte) <= 0
  if ("gte" in cond) return isPresent(lhs) && cmp(lhs, cond.gte) >= 0
  if ("isNull" in cond) return isNullish(lhs)
  if ("in" in cond) {
    return cond.in.some((elem) =>
      elem === null ? isNullish(lhs) : isPresent(lhs) && jsonEquals(lhs, elem)
    )
  }
  if ("notIn" in cond) {
    return cond.notIn.every((elem) =>
      elem === null ? !isNullish(lhs) : !(isPresent(lhs) && jsonEquals(lhs, elem))
    )
  }
  if ("contains" in cond) {
    const t = textOf(lhs)
    if (t === null) return false
    return t.toLowerCase().includes(cond.contains.toLowerCase())
  }
  if ("notContains" in cond) {
    const t = textOf(lhs)
    return t === null || !t.toLowerCase().includes(cond.notContains.toLowerCase())
  }
  if ("includes" in cond) {
    return Array.isArray(lhs) && lhs.some((e) => jsonEquals(e, cond.includes))
  }
  if ("isEmpty" in cond) {
    if (contentKeys.has(cond.key)) return !pageHasNonEmptyContentKey(page, cond.key)
    if (richDocumentKeys.has(cond.key)) return isBlocksValueEmpty(asPropertyValue(lhs))
    return isEmptyCell(lhs)
  }
  if ("isNotEmpty" in cond) {
    if (contentKeys.has(cond.key)) return pageHasNonEmptyContentKey(page, cond.key)
    if (richDocumentKeys.has(cond.key)) return !isBlocksValueEmpty(asPropertyValue(lhs))
    return !isEmptyCell(lhs)
  }
  throw new Error(`view-match: unknown condition shape ${JSON.stringify(cond)}`)
}

function isEmptyCell(lhs: unknown): boolean {
  if (isNullish(lhs)) return true
  if (lhs === "") return true
  return Array.isArray(lhs) && lhs.length === 0
}

export function viewMatchesRow(
  page: Readonly<Record<string, unknown>>,
  filters: PageWhere,
  resolved: ResolvedOverlay,
  materializedKeys: ReadonlySet<string>,
  contentKeys: ReadonlySet<string>,
  richDocumentKeys: ReadonlySet<string>
): boolean {
  for (const cond of filters) {
    if (!matchCondition(page, resolved, materializedKeys, contentKeys, richDocumentKeys, cond)) {
      return false
    }
  }
  return true
}
