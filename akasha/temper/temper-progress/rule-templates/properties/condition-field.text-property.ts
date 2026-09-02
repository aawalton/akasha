import type { TextProperty } from "@akasha/pages-system/text-property"

export type ConditionField = string

export const conditionField = {
  id: "01a05fd0-3aa3-7030-b6ea-b5999bd300d5",
  pageTypeSlug: "text-property",
  slug: "condition-field",
  propertySlug: "condition-field",
  definition: "the test one condition of a rule names",
  max: 50,
  nameFormatSlug: "name-format/lower-camel-case",
} as const satisfies TextProperty
