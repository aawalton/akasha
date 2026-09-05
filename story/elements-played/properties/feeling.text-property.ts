import type { TextProperty } from "@akasha/pages-system/text-property"

export type Feeling = string

export const feeling = {
  id: "01a06828-cb94-75a3-bc5b-8a59e104524e",
  pageTypeSlug: "text-property",
  slug: "feeling",
  propertySlug: "feeling",
  definition: "how an element is",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
