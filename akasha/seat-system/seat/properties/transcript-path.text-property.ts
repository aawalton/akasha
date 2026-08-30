import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type TranscriptPath = string

export const transcriptPath = {
  id: "01a05035-2609-78f7-913f-e51add0c96de",
  pageTypeSlug: "text-property",
  slug: "transcript-path",
  definition: "where a seat writes what was said in it",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
