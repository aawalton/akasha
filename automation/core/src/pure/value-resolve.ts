import { evaluateFormula } from "@shared/pages-core/formula/evaluate"
import { FormulaParseError } from "@shared/pages-core/formula/lexer"
import { parseExpression } from "@shared/pages-core/formula/parser"
import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import type { EvaluationContext, ValueExpr } from "./types"

export function resolveValueExpr(
  expr: ValueExpr,
  ctx: EvaluationContext,
  formulaValues?: { readonly source: Readonly<Record<string, ReadonlyJSONValue>> }
): ReadonlyJSONValue {
  if (typeof expr !== "string") return expr
  if (!expr.startsWith("=")) return expr
  const body = expr.slice(1)
  try {
    const node = parseExpression(body)
    if (formulaValues !== undefined) {
      return evaluateFormula(node, formulaValues)
    }
    const scope: Record<string, ReadonlyJSONValue> = { source: ctx.source }
    if (ctx.referrer !== undefined) scope.referrer = ctx.referrer
    if (ctx.match !== undefined) scope.match = ctx.match
    return evaluateFormula(node, scope)
  } catch (err) {
    if (err instanceof FormulaParseError) return null
    return null
  }
}

export function resolveRecord(
  record: Readonly<Record<string, ValueExpr>>,
  ctx: EvaluationContext,
  formulaValues?: { readonly source: Readonly<Record<string, ReadonlyJSONValue>> }
): Record<string, ReadonlyJSONValue> {
  const out: Record<string, ReadonlyJSONValue> = {}
  for (const [key, value] of Object.entries(record)) {
    out[key] = resolveValueExpr(value, ctx, formulaValues)
  }
  return out
}
