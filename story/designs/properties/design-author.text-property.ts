import type { TextProperty } from "@akasha/pages-system/text-property"

export type DesignAuthor = string

export const designAuthor = {
  id: "01a06577-f385-7e2a-8f05-e84989850077",
  pageTypeSlug: "text-property",
  slug: "design-author",
  propertySlug: "author",
  definition: "who a story is written as being by",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
