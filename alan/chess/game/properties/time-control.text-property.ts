import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const timeControl = {
  id: "01a06582-bd62-7806-aa06-cbbb5adca34e",
  type: "page-type/text-property",
  slug: "time-control",
  propertySlug: "time-control",
  definition: "a game's clock",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
