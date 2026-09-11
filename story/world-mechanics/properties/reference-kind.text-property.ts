import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const referenceKind = {
  id: "01a06558-a991-7715-82b3-ff639c990933",
  type: "text-property",
  slug: "reference-kind",
  propertySlug: "kind",
  definition: "which kind of mechanic a naming reads as",
  maxLength: 36,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
