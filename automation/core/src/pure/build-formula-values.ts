import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import type { EvaluationContext, RelationCache } from "./types"

export function buildFormulaValues(
  ctx: EvaluationContext,
  relationCache: RelationCache
): { readonly source: Readonly<Record<string, ReadonlyJSONValue>> } {
  const out: Record<string, ReadonlyJSONValue> = { ...ctx.source }
  for (const [relPropId, bag] of Object.entries(relationCache)) {
    out[relPropId] = bag
  }
  return { source: out }
}
