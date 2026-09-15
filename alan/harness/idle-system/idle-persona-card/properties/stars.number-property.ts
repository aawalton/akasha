import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const stars = {
  id: "01a06596-f0d5-7000-9936-5b8c14380ae2",
  type: "page-type/number-property",
  slug: "stars",
  propertySlug: "stars",
  definition: "how many stars a card has been raised to",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
