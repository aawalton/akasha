import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const armorBaseValue = {
  id: "01a05fd1-d435-7668-b188-cb30d1aa4efe",
  type: "page-type/number-property",
  slug: "armor-base-value",
  propertySlug: "base-value",
  definition: "the armor a piece of a weight gives before its kind is counted",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
