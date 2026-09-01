import type { TextProperty } from "@akasha/pages-system/text-property"

export type Sense = string

export const sense = {
  id: "01a0592c-2737-7657-8471-7540e289ef9d",
  pageTypeSlug: "text-property",
  slug: "sense",
  propertySlug: "sense",
  definition: "the meaning a word is never written in",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
