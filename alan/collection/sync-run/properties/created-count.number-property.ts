import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const createdCount = {
  id: "01a06861-f664-787d-86f6-530cc3b41607",
  type: "page-type/number-property",
  slug: "created-count",
  propertySlug: "created-count",
  definition: "how many pages a pull brought in that were not there before",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
