import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const healCount = {
  id: "01a06193-6caa-71e6-b133-c151112a6fea",
  type: "page-type/number-property",
  slug: "heal-count",
  propertySlug: "heal-count",
  definition: "how many heals a cast lands",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
