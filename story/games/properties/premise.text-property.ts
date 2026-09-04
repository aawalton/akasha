import type { TextProperty } from "@akasha/pages-system/text-property"

export type Premise = string

export const premise = {
  id: "01a0673c-8e0e-7002-8d21-37128cc90f95",
  pageTypeSlug: "text-property",
  slug: "premise",
  propertySlug: "premise",
  definition: "what a game is about, said as the player meets it",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
