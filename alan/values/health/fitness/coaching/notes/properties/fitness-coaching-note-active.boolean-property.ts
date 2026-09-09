import type { BooleanProperty } from "@akasha/pages/boolean-property"

export type FitnessCoachingNoteActive = boolean

export const fitnessCoachingNoteActive = {
  id: "01a0657a-fe00-736c-907b-2cb955431927",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "fitness-coaching-note-active",
  propertySlug: "active",
  definition: "whether the note still holds",
} as const satisfies BooleanProperty
