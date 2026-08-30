import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type Place = number

export const place = {
  id: "01a05446-e763-7da7-9024-9428fb671130",
  pageTypeSlug: "number-property",
  slug: "place",
  propertySlug: "place",
  definition: "where a reading sits among those drawn with it",
  max: null,
} as const satisfies NumberProperty
