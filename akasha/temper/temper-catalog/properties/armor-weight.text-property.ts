import type { TextProperty } from "@akasha/pages-system/text-property"

export type ArmorWeight = string

export const armorWeight = {
  id: "01a05fe0-8428-703e-953c-0bf31d04039f",
  pageTypeSlug: "text-property",
  slug: "armor-weight",
  propertySlug: "armor-weight",
  definition: "how heavy a piece of armor is",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
