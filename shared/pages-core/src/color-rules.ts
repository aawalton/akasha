import { evaluateFormula } from "./formula/evaluate"
import { parseExpression } from "./formula/parser"
import type { PropertyValue } from "./property-types/types"
import type { BadgeVariant, ColorRule, ColorRuleVariant } from "./schema/color-rule"
import type { PageDataJSON, PropertyDefinition } from "./types"
import type { ReadonlyJSONValue } from "./schema/pages"

export type { BadgeVariant, ColorRule }

export function colorRuleVariantToBadgeVariant(variant: ColorRuleVariant): BadgeVariant {
  return variant === "default" ? "elevation-muted" : variant
}

export function resolveBadgeVariant(
  definition: PropertyDefinition,
  pageData: PageDataJSON,
  value: PropertyValue
): BadgeVariant | null {
  const rules = definition.colorRules
  if (!rules || rules.length === 0) return null

  const pageRecord: PageDataJSON = pageData
  const bindings: Record<string, ReadonlyJSONValue | undefined> = {
    ...pageRecord,
    source: pageRecord,
    value,
  }

  for (const rule of rules) {
    let result: ReadonlyJSONValue
    try {
      const ast = parseExpression(rule.when)
      result = evaluateFormula(ast, bindings)
    } catch {
      continue
    }
    if (result != null && result !== false && result !== 0 && result !== "") {
      return colorRuleVariantToBadgeVariant(rule.variant)
    }
  }

  return null
}
