import type { TextProperty } from "@akasha/pages-system/text-property"

export type Isbn = string

export const isbn = {
  id: "01a06741-dd0f-7000-9c5c-b35b1ae14f1c",
  pageTypeSlug: "text-property",
  slug: "isbn",
  propertySlug: "isbn",
  definition: "the ten-character number an edition was catalogued under",
  max: 10,
  nameFormatSlug: null,
} as const satisfies TextProperty
