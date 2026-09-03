import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReaderFraming = string

export const readerFraming = {
  id: "01a06577-f385-7808-a302-f8a5c3082c45",
  pageTypeSlug: "text-property",
  slug: "reader-framing",
  propertySlug: "reader-framing",
  definition: "what the reader is taken to be while reading",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
