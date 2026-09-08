import type { BooleanProperty } from "@akasha/pages/boolean-property"

export type CoachingNoteActive = boolean

export const coachingNoteActive = {
  id: "01a0657a-fe00-736c-907b-2cb955431927",
  pageTypeSlug: "boolean-property",
  slug: "coaching-note-active",
  propertySlug: "coaching-note-active",
  definition: "whether the note still holds",
} as const satisfies BooleanProperty
