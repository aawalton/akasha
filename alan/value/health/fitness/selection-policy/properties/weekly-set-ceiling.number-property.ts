import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const weeklySetCeiling = {
  id: "01a06865-7f46-7c19-ad85-e0ddc6bf4bda",
  type: "page-type/number-property",
  slug: "weekly-set-ceiling",
  propertySlug: "weekly-set-ceiling",
  definition: "how many sets a week a muscle may take before it is over-worked",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
