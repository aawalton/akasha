import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type NoneLeftEmoji = string

export const noneLeftEmoji = {
  id: "01a05446-e767-7443-a158-11de7bac9240",
  pageTypeSlug: "text-property",
  slug: "none-left-emoji",
  propertySlug: "none-left-emoji",
  definition: "the emoji drawn in place of a reading of nothing",
  max: 8,
  nameFormatSlug: null,
} as const satisfies TextProperty
