import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CreatedCount = number

export const createdCount = {
  id: "01a06861-f664-787d-86f6-530cc3b41607",
  pageTypeSlug: "number-property",
  slug: "created-count",
  propertySlug: "created-count",
  definition: "how many pages a pull brought in that were not there before",
  max: null,
} as const satisfies NumberProperty
