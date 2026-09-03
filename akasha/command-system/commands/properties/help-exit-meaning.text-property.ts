import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpExitMeaning = string

export const helpExitMeaning = {
  id: "01a06958-32b1-7796-9525-f07723a44783",
  pageTypeSlug: "text-property",
  slug: "help-exit-meaning",
  propertySlug: "meaning",
  definition: "what one exit code says about a run",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
