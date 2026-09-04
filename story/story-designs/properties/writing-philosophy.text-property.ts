import type { TextProperty } from "@akasha/pages-system/text-property"

export type WritingPhilosophy = string

export const writingPhilosophy = {
  id: "01a06577-f385-70a0-ae6c-ca7b892cbd3b",
  pageTypeSlug: "text-property",
  slug: "writing-philosophy",
  propertySlug: "writing-philosophy",
  definition: "the rules the writing of a story holds itself to",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
