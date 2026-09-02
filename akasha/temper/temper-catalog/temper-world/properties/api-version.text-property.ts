import type { TextProperty } from "@akasha/pages-system/text-property"

export type ApiVersion = string

export const apiVersion = {
  id: "01a05fc4-7a8f-70ba-9a82-91ea7a039a9b",
  pageTypeSlug: "text-property",
  slug: "api-version",
  propertySlug: "api-version",
  definition: "the game build a capture was taken from",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
