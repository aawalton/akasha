import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ReadingName = string

export const readingName = {
  id: "01a063ce-6216-7004-9154-4fc8998b0937",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "reading-name",
  propertySlug: "reading-name",
  definition: "the name as a world's text writes it",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
