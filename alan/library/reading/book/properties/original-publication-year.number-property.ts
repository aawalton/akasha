import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const originalPublicationYear = {
  id: "01a06741-dd0f-7003-b947-5e008e4a62f9",
  type: "page-type/number-property",
  slug: "original-publication-year",
  propertySlug: "original-publication-year",
  definition: "the year a book first came out, whatever edition is held",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
