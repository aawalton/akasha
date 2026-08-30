import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type History = string

export const history = {
  id: "01a053b6-89b7-7208-aa7a-2b9bbe03cd08",
  pageTypeSlug: "text-property",
  slug: "history",
  propertySlug: "history",
  definition: "how a persona came to be, told in her own voice",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
