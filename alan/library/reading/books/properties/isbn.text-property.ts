import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const isbn = {
  id: "01a06741-dd0f-7000-9c5c-b35b1ae14f1c",
  type: "text-property",
  slug: "isbn",
  propertySlug: "isbn",
  definition: "the ten-character number an edition was catalogued under",
  maxLength: 10,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
