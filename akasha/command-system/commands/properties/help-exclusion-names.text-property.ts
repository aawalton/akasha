import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpExclusionNames = string

export const helpExclusionNames = {
  id: "01a06958-32b9-739a-81f6-2f0222801492",
  pageTypeSlug: "text-property",
  slug: "help-exclusion-names",
  propertySlug: "names",
  definition: "one flag in a set no two of which are given together",
  max: 60,
  nameFormatSlug: null,
} as const satisfies TextProperty
