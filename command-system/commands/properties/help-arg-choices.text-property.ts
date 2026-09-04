import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpArgChoices = string

export const helpArgChoices = {
  id: "01a06958-32ae-76d8-a3a3-8610a5d435e1",
  pageTypeSlug: "text-property",
  slug: "help-arg-choices",
  propertySlug: "choices",
  definition: "one value a flag accepts, where the accepted values are named",
  max: 60,
  nameFormatSlug: null,
} as const satisfies TextProperty
