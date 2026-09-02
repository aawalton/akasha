import type { TextProperty } from "@akasha/pages-system/text-property"

export type Action = string

export const action = {
  id: "01a05fd0-3aa2-7b8c-94d8-d42fee16f415",
  pageTypeSlug: "text-property",
  slug: "action",
  propertySlug: "action",
  definition: "what a rule does to an item the rule matches",
  max: 50,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
