import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const designAuthor = {
  id: "01a06577-f385-7e2a-8f05-e84989850077",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "design-author",
  propertySlug: "author",
  definition: "who a story is written as being by",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
