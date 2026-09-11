import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const fitnessCoachingNoteActive = {
  id: "01a0657a-fe00-736c-907b-2cb955431927",
  type: "boolean-property",
  slug: "fitness-coaching-note-active",
  propertySlug: "active",
  definition: "whether the note still holds",
  types: "ts",
} as const satisfies BooleanProperty
