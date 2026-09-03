import type { TextProperty } from "@akasha/pages-system/text-property"

export type Wanting = string

export const wanting = {
  id: "01a06828-cb95-75d6-bded-037a8040ab95",
  pageTypeSlug: "text-property",
  slug: "wanting",
  propertySlug: "wanting",
  definition: "what an element is after",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
