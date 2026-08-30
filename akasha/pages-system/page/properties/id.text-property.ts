import type { TextProperty } from "../../text-property/text-property.page-type.ts"

export type Id = string

export const id = {
  id: "01a049b9-856c-7ee7-b958-f63eead00582",
  pageTypeSlug: "text-property",
  slug: "id",
  propertySlug: "id",
  definition: "the identity a page keeps for its whole life",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  unique: "always",
  generator: "uuid-v7",
} as const satisfies TextProperty
