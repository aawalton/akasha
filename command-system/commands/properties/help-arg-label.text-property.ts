import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpArgLabel = string

export const helpArgLabel = {
  id: "01a06958-32ab-7bd9-9de9-0a72e14fc450",
  pageTypeSlug: "text-property",
  slug: "help-arg-label",
  propertySlug: "arg-label",
  definition: "the name a flag's value is printed under",
  max: 40,
  nameFormatSlug: null,
} as const satisfies TextProperty
