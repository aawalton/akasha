import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const spokenText = {
  id: "01a0c643-5846-7651-bec0-34fd4fdb99b6",
  type: "page-type/text-property",
  slug: "spoken-text",
  propertySlug: "text",
  definition: "the words a sound says",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
