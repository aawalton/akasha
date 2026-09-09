import type { TextProperty } from "@akasha/pages/text-property"

export type Wording = string

export const wording = {
  id: "01a06558-a991-7142-8266-411f329c55ab",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "wording",
  propertySlug: "wording",
  definition: "the name as that one place in the text wrote it",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
