import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ReaderFraming = string

export const readerFraming = {
  id: "01a0673c-8e0e-7004-b160-c82726e03692",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "reader-framing",
  propertySlug: "reader-framing",
  definition: "the person and tense a game is told in",
  maxLength: 300,
  nameFormat: null,
} as const satisfies TextProperty
