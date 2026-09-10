import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Sense = string

export const sense = {
  id: "01a0592c-2737-7657-8471-7540e289ef9d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "sense",
  propertySlug: "sense",
  definition: "the meaning a word is never written in",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
