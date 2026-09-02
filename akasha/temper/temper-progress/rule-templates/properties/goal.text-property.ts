import type { TextProperty } from "@akasha/pages-system/text-property"

export type Goal = string

export const goal = {
  id: "01a05fd0-3aa5-7e52-843e-37a0187718f4",
  pageTypeSlug: "text-property",
  slug: "goal",
  propertySlug: "goal",
  definition: "what a rule is kept for, as the rule is filed for a reader",
  max: 50,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
