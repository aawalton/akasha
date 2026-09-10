import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Doing = string

export const doing = {
  id: "01a06828-cb96-7303-b2c0-e03a903f8d29",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "doing",
  propertySlug: "doing",
  definition: "how an element acts",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
