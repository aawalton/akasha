import type { ColorRule } from "./color-rules"
import type { PropertyDefinition, PropertyType } from "./types"

export function asPropertyDefinition(
  overrides: Partial<PropertyDefinition> & { id: string; type: PropertyType } & {
    colorRules?: readonly ColorRule[]
  }
): PropertyDefinition {
  return { title: overrides.id, ...overrides } as PropertyDefinition
}
