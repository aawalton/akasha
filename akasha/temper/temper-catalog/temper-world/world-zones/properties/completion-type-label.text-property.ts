import type { TextProperty } from "@akasha/pages-system/text-property"

export type CompletionTypeLabel = string

export const completionTypeLabel = {
  id: "01a06167-3f9b-7008-a918-df5312c7db75",
  pageTypeSlug: "text-property",
  slug: "completion-type-label",
  propertySlug: "completion-type-label",
  definition: "the name a kind of completion activity is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
