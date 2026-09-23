import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const constantFamily = {
  id: "01a0cebd-65d5-7bb3-b526-d3150c88df06",
  type: "page-type/select-property",
  slug: "constant-family",
  propertySlug: "constant-family",
  definition: "the group of gear values a constant belongs to",
  values: ["armor-type", "weapon-type", "quality"],
  types: "ts",
} as const satisfies SelectProperty
