import type { TextProperty } from "@akasha/pages/text-property"

export type Isbn13 = string

export const isbn13 = {
  id: "01a06741-dd0f-7001-a6f5-c643117c74b6",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "isbn13",
  propertySlug: "isbn13",
  definition: "the thirteen-digit number an edition is catalogued under now",
  maxLength: 13,
  nameFormat: null,
} as const satisfies TextProperty
