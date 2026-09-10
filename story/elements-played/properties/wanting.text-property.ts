import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Wanting = string

export const wanting = {
  id: "01a06828-cb95-75d6-bded-037a8040ab95",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "wanting",
  propertySlug: "wanting",
  definition: "what an element is after",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
