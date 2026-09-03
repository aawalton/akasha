import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpArgDefault = string

export const helpArgDefault = {
  id: "01a06958-32ad-74db-9455-1387145662a5",
  pageTypeSlug: "text-property",
  slug: "help-arg-default",
  propertySlug: "default",
  definition: "the value an argument takes where none is given",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
