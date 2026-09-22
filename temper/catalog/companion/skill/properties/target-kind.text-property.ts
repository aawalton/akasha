import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const targetKind = {
  id: "01a06193-6c9e-705c-af85-3dc816a00a9a",
  type: "page-type/text-property",
  slug: "target-kind",
  propertySlug: "type",
  definition: "an effect's target",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
