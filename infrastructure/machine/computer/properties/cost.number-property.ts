import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const cost = {
  id: "01a0658c-329a-78a2-ad0d-f2f3925debcd",
  type: "page-type/number-property",
  slug: "cost",
  propertySlug: "cost",
  definition: "what Alan paid for it",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
