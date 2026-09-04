import type { TextProperty } from "@akasha/pages-system/text-property"

export type ArcStructure = string

export const arcStructure = {
  id: "01a06577-f385-7d82-9322-ca4e27181d96",
  pageTypeSlug: "text-property",
  slug: "arc-structure",
  propertySlug: "arc-structure",
  definition: "the arcs a story is planned to run through",
  max: 12000,
  nameFormatSlug: null,
} as const satisfies TextProperty
