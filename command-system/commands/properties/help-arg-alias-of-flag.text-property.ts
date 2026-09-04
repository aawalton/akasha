import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpArgAliasOfFlag = string

export const helpArgAliasOfFlag = {
  id: "01a06958-32b0-7771-a27f-45acd40bcf57",
  pageTypeSlug: "text-property",
  slug: "help-arg-alias-of-flag",
  propertySlug: "alias-of-flag",
  definition: "the flag a positional argument fills in for",
  max: 60,
  nameFormatSlug: null,
} as const satisfies TextProperty
