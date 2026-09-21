import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const conditionalMultiplier = {
  id: "01a06193-6cab-770f-a188-54931a2fd3fd",
  type: "page-type/number-property",
  slug: "conditional-multiplier",
  propertySlug: "conditional-multiplier",
  definition: "what an effect's value is multiplied by while its tests hold",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
