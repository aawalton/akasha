import type { ColorRule } from "./schema/color-rule.ts"
import type { PropertyDefinition, PropertyType } from "./types.ts"

export function asPropertyDefinition(
  overrides: Partial<PropertyDefinition> & { id: string; type: PropertyType } & {
    colorRules?: readonly ColorRule[]
  }
): PropertyDefinition {
  return { title: overrides.id, ...overrides } as PropertyDefinition
}
