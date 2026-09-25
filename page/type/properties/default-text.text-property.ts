import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const defaultText = {
  id: "01a0d925-d415-72e4-9006-8b6846ce2406",
  type: "page-type/text-property",
  slug: "default-text",
  propertySlug: "default-text",
  definition: "the default of a property holding text, a choice or a file's extension",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
