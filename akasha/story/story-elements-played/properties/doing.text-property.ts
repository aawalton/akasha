import type { TextProperty } from "@akasha/pages-system/text-property"

export type Doing = string

export const doing = {
  id: "01a06828-cb96-7303-b2c0-e03a903f8d29",
  pageTypeSlug: "text-property",
  slug: "doing",
  propertySlug: "doing",
  definition: "how an element acts",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
