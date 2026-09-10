import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Spelling = string

export const spelling = {
  id: "01a081e9-1a78-73a6-8c6c-7a719c58d07f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "spelling",
  propertySlug: "spelling",
  definition: "how a term is written, in its plainest form",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
