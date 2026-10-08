import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const isbn = {
  id: "01a06741-dd0f-7000-9c5c-b35b1ae14f1c",
  type: "page-type/text-property",
  slug: "isbn",
  propertySlug: "isbn",
  definition: "an edition's ten-character catalogue number",
  maxLength: 10,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T12:32:44.815Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies TextProperty
