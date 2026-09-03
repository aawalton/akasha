import type { TextProperty } from "@akasha/pages-system/text-property"

export type ClaimedBySlug = string

export const claimedBySlug = {
  id: "01a06558-a991-7488-9ae2-ee17116e4221",
  pageTypeSlug: "text-property",
  slug: "claimed-by-slug",
  propertySlug: "claimed-by-slug",
  definition: "the character the text is read as giving it to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
