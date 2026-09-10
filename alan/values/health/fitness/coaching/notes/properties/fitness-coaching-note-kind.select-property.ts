import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const fitnessCoachingNoteKind = {
  id: "01a0657a-fe00-7149-b974-3ad13dd29e09",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "fitness-coaching-note-kind",
  propertySlug: "kind",
  definition: "what sort of note this is",
  values: [
    "medical-gate",
    "programming-cue",
    "equipment-ceiling",
    "injury-watch",
    "ef-accommodation",
    "bout-observation",
  ],
} as const satisfies SelectProperty

export type FitnessCoachingNoteKind = (typeof fitnessCoachingNoteKind.values)[number]
