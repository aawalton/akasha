import type { TextProperty } from "@akasha/pages/text-property"

export type NoteSubject = string

export const noteSubject = {
  id: "01a06578-d638-7105-8018-11248f114637",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "note-subject",
  propertySlug: "subject",
  definition: "what one working document is about",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
