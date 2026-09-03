import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpArgName = string

export const helpArgName = {
  id: "01a06958-32a9-7339-a23e-d3158887e65f",
  pageTypeSlug: "text-property",
  slug: "help-arg-name",
  propertySlug: "name",
  definition: "how one argument is spelled where it is typed",
  max: 60,
  nameFormatSlug: null,
} as const satisfies TextProperty
