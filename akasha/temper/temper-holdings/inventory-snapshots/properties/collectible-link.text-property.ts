import type { TextProperty } from "@akasha/pages-system/text-property"

export type CollectibleLink = string

export const collectibleLink = {
  id: "01a0675a-f185-7b9d-9714-42e1366488ae",
  pageTypeSlug: "text-property",
  slug: "collectible-link",
  propertySlug: "collectible-link",
  definition: "the string the game writes a collectible's whole state as",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
