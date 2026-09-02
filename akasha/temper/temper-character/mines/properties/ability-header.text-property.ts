import type { TextProperty } from "@akasha/pages-system/text-property"

export type AbilityHeader = string

export const abilityHeader = {
  id: "01a05fcd-f54c-7d17-833b-2cdc7610f956",
  pageTypeSlug: "text-property",
  slug: "ability-header",
  propertySlug: "ability-header",
  definition: "the line an item's ability is shown under",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
