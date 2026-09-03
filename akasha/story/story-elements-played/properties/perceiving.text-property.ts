import type { TextProperty } from "@akasha/pages-system/text-property"

export type Perceiving = string

export const perceiving = {
  id: "01a06828-cb92-72da-b8dd-283125f0a0f9",
  pageTypeSlug: "text-property",
  slug: "perceiving",
  propertySlug: "perceiving",
  definition: "what an element takes in",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
