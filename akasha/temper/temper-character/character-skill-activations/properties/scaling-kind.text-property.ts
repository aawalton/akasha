import type { TextProperty } from "@akasha/pages-system/text-property"

export type ScalingKind = string

export const scalingKind = {
  id: "01a05fcd-f549-7dc9-9a01-64ab56ce9e42",
  pageTypeSlug: "text-property",
  slug: "scaling-kind",
  propertySlug: "scaling-kind",
  definition: "how an effect is worked out from the number it reads",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
