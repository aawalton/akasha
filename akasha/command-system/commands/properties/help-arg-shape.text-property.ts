import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpArgShape = string

export const helpArgShape = {
  id: "01a06958-32ac-71bf-946d-7e4164e26865",
  pageTypeSlug: "text-property",
  slug: "help-arg-shape",
  propertySlug: "value-shape",
  definition: "whether a flag's value is one token, one line, or prose",
  max: 10,
  nameFormatSlug: null,
} as const satisfies TextProperty
