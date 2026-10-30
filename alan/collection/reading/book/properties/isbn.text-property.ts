import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const isbn = {
  id: "01a06741-dd0f-7000-9c5c-b35b1ae14f1c",
  type: "page-type/text-property",
  slug: "isbn",
  propertySlug: "isbn",
  definition: "the short catalogue number of an edition",
  maxLength: 10,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T12:32:44.815Z",
  updatedAt: "2026-10-30T15:20:54.481Z",
} as const satisfies TextProperty
