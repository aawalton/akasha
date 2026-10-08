import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const referenceKind = {
  id: "01a06558-a991-7715-82b3-ff639c990933",
  type: "page-type/text-property",
  slug: "reference-kind",
  propertySlug: "kind",
  definition: "which kind of mechanic a naming is taken as",
  maxLength: 36,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-22T13:25:39.000Z",
} as const satisfies TextProperty
