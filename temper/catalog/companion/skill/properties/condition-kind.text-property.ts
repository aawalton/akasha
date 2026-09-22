import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const conditionKind = {
  id: "01a06193-6c9f-770c-8d91-5ed8daef932d",
  type: "page-type/text-property",
  slug: "condition-kind",
  propertySlug: "type",
  definition: "what a test inside an effect reads",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
