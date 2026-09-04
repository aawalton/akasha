import type { NumberProperty } from "@akasha/pages-system/number-property"

export type OriginalPublicationYear = number

export const originalPublicationYear = {
  id: "01a06741-dd0f-7003-b947-5e008e4a62f9",
  pageTypeSlug: "number-property",
  slug: "original-publication-year",
  propertySlug: "original-publication-year",
  definition: "the year a book first came out, whatever edition is held",
  max: null,
} as const satisfies NumberProperty
