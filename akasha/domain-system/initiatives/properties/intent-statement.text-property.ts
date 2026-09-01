import type { TextProperty } from "@akasha/pages-system/text-property"

export type IntentStatement = string

export const intentStatement = {
  id: "01a05f19-7b27-7bb1-955d-9086b34c5c30",
  pageTypeSlug: "text-property",
  slug: "intent-statement",
  propertySlug: "statement",
  definition: "one sentence saying what an initiative is to make so",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
