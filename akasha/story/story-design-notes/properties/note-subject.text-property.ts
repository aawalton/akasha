import type { TextProperty } from "@akasha/pages-system/text-property"

export type NoteSubject = string

export const noteSubject = {
  id: "01a06578-d638-7105-8018-11248f114637",
  pageTypeSlug: "text-property",
  slug: "note-subject",
  propertySlug: "subject",
  definition: "what one working document is about",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
