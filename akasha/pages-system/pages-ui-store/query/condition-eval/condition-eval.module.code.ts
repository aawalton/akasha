import { isPromotedKey, PROMOTED_COLUMN } from "@akasha/pages-access/routing-core"
import { pageHasNonEmptyContentKey } from "@akasha/pages-core/schema/content-tier"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { Json } from "@akasha/utils-narrow/json-value"
import {
  asPageRecord,
  asRecord,
  attributesOf,
  type PageRow,
} from "../../collection/page-row/page-row.module.code.ts"
import type { PageConditionLike } from "../../sql/options/options.module.code.ts"

const MISSING = Symbol("missing")

function promotedValue(row: PageRow, key: string): unknown {
  if (!isPromotedKey(key)) return MISSING
  return asPageRecord(row)[PROMOTED_COLUMN[key]] ?? null
}

function rawValue(row: PageRow, key: string): unknown {
  const promoted = promotedValue(row, key)
  if (promoted !== MISSING) return promoted
  const attrs = attributesOf(row)
  return key in attrs ? attrs[key] : undefined
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false
  const aArr = Array.isArray(a)
  if (aArr !== Array.isArray(b)) return false
  if (aArr && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => deepEqual(x, b[i]))
  }
  const ao = asRecord(a)
  const bo = asRecord(b)
  const ak = Object.keys(ao)
  return ak.length === Object.keys(bo).length && ak.every((k) => k in bo && deepEqual(ao[k], bo[k]))
}

function jsonbContains(container: unknown, contained: unknown): boolean {
  if (contained === null || typeof contained !== "object") {
    if (deepEqual(container, contained)) return true
    return Array.isArray(container) && container.some((e) => deepEqual(e, contained))
  }
  if (Array.isArray(contained)) {
    if (!Array.isArray(container)) return false
    return contained.every((ce) => container.some((cc) => jsonbContains(cc, ce)))
  }
  if (container === null || typeof container !== "object" || Array.isArray(container)) return false
  const co = asRecord(container)
  const cd = asRecord(contained)
  return Object.keys(cd).every((k) => k in co && jsonbContains(co[k], cd[k]))
}

function attributeContains(row: PageRow, key: string, value: Json): boolean {
  return jsonbContains(attributesOf(row), { [key]: value })
}

function isDistinctFrom(a: unknown, b: unknown): boolean {
  const aNull = a === null || a === undefined
  const bNull = b === null || b === undefined
  if (aNull && bNull) return false
  if (aNull || bNull) return true
  return !deepEqual(a, b)
}

function isEmptyValue(row: PageRow, key: string): boolean {
  const promoted = promotedValue(row, key)
  if (promoted !== MISSING) return promoted === null || promoted === ""
  const attrs = attributesOf(row)
  if (!(key in attrs)) return !pageHasNonEmptyContentKey(attrs, key)
  const v = attrs[key]
  return v === null || v === "" || (Array.isArray(v) && v.length === 0)
}

function comparisonValue(row: PageRow, key: string, against: Json): unknown {
  void against
  return rawValue(row, key)
}

function comparable(v: unknown): v is number | string {
  return typeof v === "number" || typeof v === "string"
}

export function conditionMatches(cond: PageConditionLike, row: PageRow): boolean {
  if ("or" in cond) {
    if (cond.or.length === 0) {
      throw new Error("conditionMatches: empty 'or' disjunction is not supported")
    }
    return cond.or.some((c) => conditionMatches(c, row))
  }
  if ("eq" in cond) {
    const promoted = promotedValue(row, cond.key)
    if (promoted !== MISSING) return deepEqual(promoted, cond.eq)
    return attributeContains(row, cond.key, cond.eq)
  }
  if ("neq" in cond) {
    const promoted = promotedValue(row, cond.key)
    if (promoted !== MISSING) return isDistinctFrom(promoted, cond.neq)
    return !attributeContains(row, cond.key, cond.neq)
  }
  if ("lt" in cond) {
    const a = comparisonValue(row, cond.key, cond.lt)
    return comparable(a) && comparable(cond.lt) && a < cond.lt
  }
  if ("gt" in cond) {
    const a = comparisonValue(row, cond.key, cond.gt)
    return comparable(a) && comparable(cond.gt) && a > cond.gt
  }
  if ("lte" in cond) {
    const a = comparisonValue(row, cond.key, cond.lte)
    return comparable(a) && comparable(cond.lte) && a <= cond.lte
  }
  if ("gte" in cond) {
    const a = comparisonValue(row, cond.key, cond.gte)
    return comparable(a) && comparable(cond.gte) && a >= cond.gte
  }
  if ("isNull" in cond) {
    const promoted = promotedValue(row, cond.key)
    if (promoted !== MISSING) return promoted === null
    const attrs = attributesOf(row)
    return !(cond.key in attrs) || attrs[cond.key] === null
  }
  if ("in" in cond) {
    if (cond.in.length === 0) return false
    const promoted = promotedValue(row, cond.key)
    if (promoted !== MISSING) return cond.in.some((v) => deepEqual(promoted, v))
    return cond.in.some((v) => attributeContains(row, cond.key, v))
  }
  if ("notIn" in cond) {
    if (cond.notIn.length === 0) return true
    const promoted = promotedValue(row, cond.key)
    if (promoted !== MISSING) {
      return promoted === null || !cond.notIn.some((v) => deepEqual(promoted, v))
    }
    return cond.notIn.every((v) => !attributeContains(row, cond.key, v))
  }
  if ("contains" in cond) {
    const t = textProjection(row, cond.key)
    return t?.toLowerCase().includes(cond.contains.toLowerCase()) ?? false
  }
  if ("notContains" in cond) {
    const t = textProjection(row, cond.key)
    return t === null || !t.toLowerCase().includes(cond.notContains.toLowerCase())
  }
  if ("includes" in cond) {
    return attributeContains(row, cond.key, [cond.includes])
  }
  if ("isEmpty" in cond) {
    return isEmptyValue(row, cond.key)
  }
  if ("isNotEmpty" in cond) {
    return !isEmptyValue(row, cond.key)
  }
  return assertNever(cond)
}

function textProjection(row: PageRow, key: string): string | null {
  const promoted = promotedValue(row, key)
  if (promoted !== MISSING) return promoted === null ? null : String(promoted)
  const attrs = attributesOf(row)
  if (!(key in attrs)) return null
  const v = attrs[key]
  if (v === null) return null
  if (typeof v === "string") return v
  return String(v)
}
