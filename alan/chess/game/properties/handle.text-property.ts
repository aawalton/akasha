import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const handle = {
  id: "01a06582-bd62-7728-bc8f-07ef64d9438b",
  type: "page-type/text-property",
  slug: "handle",
  propertySlug: "handle",
  definition: "a game's account name",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
