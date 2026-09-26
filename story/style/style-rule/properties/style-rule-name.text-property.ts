import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const styleRuleName = {
  id: "01a0de9c-aef3-7ddf-be3c-359c8bd65df4",
  type: "page-type/text-property",
  slug: "style-rule-name",
  propertySlug: "name",
  definition: "what a style rule is called",
  maxLength: 30,
  nameFormat: "name-format/start-case",
  types: "ts",
} as const satisfies TextProperty
