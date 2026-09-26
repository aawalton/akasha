import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loreFact = {
  id: "01a0deeb-9c4e-7c9e-a2d7-6db32faeabd2",
  type: "page-type/text-property",
  slug: "lore-fact",
  propertySlug: "fact",
  definition: "one statement a piece of lore makes about its world",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
