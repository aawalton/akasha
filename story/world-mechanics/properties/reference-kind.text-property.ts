import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReferenceKind = string

export const referenceKind = {
  id: "01a06558-a991-7715-82b3-ff639c990933",
  pageTypeSlug: "text-property",
  slug: "reference-kind",
  propertySlug: "kind",
  definition: "which kind of mechanic a naming reads as",
  max: 36,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
