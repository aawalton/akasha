import type { TextProperty } from "@akasha/pages-system/text-property"

export type EffectType = string

export const effectType = {
  id: "01a05fb0-3cec-7336-a2af-ef2657a47e86",
  pageTypeSlug: "text-property",
  slug: "effect-type",
  propertySlug: "type",
  definition: "how an effect's value is read against the metric the effect moves",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
