import type { TextProperty } from "@akasha/pages-system/text-property"

export type ConditionKind = string

export const conditionKind = {
  id: "01a06193-6c9f-770c-8d91-5ed8daef932d",
  pageTypeSlug: "text-property",
  slug: "condition-kind",
  propertySlug: "type",
  definition: "what one test inside an effect reads",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
