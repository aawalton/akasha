import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-types/modules/property-type-ops/property-type-ops.module.code.ts"
import type {
  BadgeVariant,
  ColorRuleVariant,
} from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"

export function colorRuleVariantToBadgeVariant(variant: ColorRuleVariant): BadgeVariant {
  return variant === "default" ? "elevation-muted" : variant
}

export function resolveBadgeVariant(
  definition: PropertyDefinition,
  value: PropertyValue
): BadgeVariant | null {
  const colorRule = definition.colorRule
  if (colorRule === undefined) return null
  const variant = colorRule(value)
  return variant === null ? null : colorRuleVariantToBadgeVariant(variant)
}
