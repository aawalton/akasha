import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ClaimedBySlug = string

export const claimedBySlug = {
  id: "01a06558-a991-7488-9ae2-ee17116e4221",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "claimed-by-slug",
  propertySlug: "claimed-by-slug",
  definition: "the character the text is read as giving it to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
