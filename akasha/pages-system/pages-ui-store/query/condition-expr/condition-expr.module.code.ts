import { isPromotedKey, PROMOTED_COLUMN } from "@akasha/pages-access/routing-core"
import type { Json } from "@akasha/utils-narrow/json-value"
import {
  eq,
  gt,
  gte,
  IR,
  ilike,
  inArray,
  isNull,
  isUndefined,
  lt,
  lte,
  not,
  or,
} from "@tanstack/db"
import type { PageConditionLike } from "../../sql/options/options.module.code.ts"

export type BoolExpr = IR.BasicExpression<boolean>

function propRef(path: readonly string[]): IR.PropRef<Json> {
  return new IR.PropRef<Json>([...path])
}

function strRef(path: readonly string[]): IR.PropRef<string> {
  return new IR.PropRef<string>([...path])
}

function lit(value: Json): IR.Value<Json> {
  return new IR.Value<Json>(value)
}

function pathFor(alias: string, key: string): readonly string[] {
  return isPromotedKey(key) ? [alias, PROMOTED_COLUMN[key]] : [alias, "attributes", key]
}

function isNullish(ref: IR.BasicExpression<Json>): BoolExpr {
  return or(isNull(ref), isUndefined(ref))
}

function constFalse(alias: string): BoolExpr {
  return inArray(propRef([alias, "id"]), lit([]))
}
export function constTrue(alias: string): BoolExpr {
  return not(constFalse(alias))
}

function escapeLike(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_")
}

export function conditionToExpr(cond: PageConditionLike, alias = "p"): BoolExpr | null {
  if ("or" in cond) {
    if (cond.or.length === 0) {
      throw new Error("conditionToExpr: empty 'or' disjunction is not supported")
    }
    const parts = cond.or.map((c) => conditionToExpr(c, alias))
    if (parts.some((p) => p === null)) return null
    const [first, ...rest] = parts.filter((p): p is BoolExpr => p !== null)
    if (first === undefined) throw new Error("conditionToExpr: empty 'or' disjunction")
    return rest.reduce<BoolExpr>((acc, e) => or(acc, e), first)
  }
  if ("eq" in cond) {
    return eq(propRef(pathFor(alias, cond.key)), lit(cond.eq))
  }
  if ("neq" in cond) {
    const ref = propRef(pathFor(alias, cond.key))
    return or(isNull(ref), isUndefined(ref), not(eq(ref, lit(cond.neq))))
  }
  if ("lt" in cond) return lt(propRef(pathFor(alias, cond.key)), lit(cond.lt))
  if ("gt" in cond) return gt(propRef(pathFor(alias, cond.key)), lit(cond.gt))
  if ("lte" in cond) return lte(propRef(pathFor(alias, cond.key)), lit(cond.lte))
  if ("gte" in cond) return gte(propRef(pathFor(alias, cond.key)), lit(cond.gte))
  if ("isNull" in cond) {
    return isNullish(propRef(pathFor(alias, cond.key)))
  }
  if ("in" in cond) {
    if (cond.in.length === 0) return constFalse(alias)
    return inArray(propRef(pathFor(alias, cond.key)), lit([...cond.in]))
  }
  if ("notIn" in cond) {
    if (cond.notIn.length === 0) return constTrue(alias)
    const ref = propRef(pathFor(alias, cond.key))
    return or(isNull(ref), isUndefined(ref), not(inArray(ref, lit([...cond.notIn]))))
  }
  if ("contains" in cond) {
    return ilike(strRef(pathFor(alias, cond.key)), `%${escapeLike(cond.contains)}%`)
  }
  if ("notContains" in cond) {
    const ref = strRef(pathFor(alias, cond.key))
    return or(isNull(ref), isUndefined(ref), not(ilike(ref, `%${escapeLike(cond.notContains)}%`)))
  }
  if ("includes" in cond) {
    if (isPromotedKey(cond.key)) {
      throw new Error(`conditionToExpr: 'includes' not supported on promoted column '${cond.key}'`)
    }
    return inArray(lit(cond.includes), propRef([alias, "attributes", cond.key]))
  }
  if ("isEmpty" in cond) return null
  if ("isNotEmpty" in cond) return null
  return null
}
