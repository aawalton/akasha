import type { TextProperty } from "@akasha/pages/text-property"

export type Perceiving = string

export const perceiving = {
  id: "01a06828-cb92-72da-b8dd-283125f0a0f9",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "perceiving",
  propertySlug: "perceiving",
  definition: "what an element takes in",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
