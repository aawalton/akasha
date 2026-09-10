import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type History = string

export const history = {
  id: "01a053b6-89b7-7208-aa7a-2b9bbe03cd08",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "history",
  propertySlug: "history",
  definition: "how a persona came to be, told in her own voice",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
