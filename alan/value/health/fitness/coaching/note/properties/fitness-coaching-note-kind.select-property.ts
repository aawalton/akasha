import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const fitnessCoachingNoteKind = {
  id: "01a0657a-fe00-7149-b974-3ad13dd29e09",
  type: "page-type/select-property",
  slug: "fitness-coaching-note-kind",
  propertySlug: "kind",
  definition: "the kind of a note",
  values: [
    "medical-gate",
    "programming-cue",
    "equipment-ceiling",
    "injury-watch",
    "ef-accommodation",
    "workout-observation",
  ],
  types: "ts",
  createdAt: "2026-09-03T04:15:54.368Z",
  updatedAt: "2026-10-30T17:38:02.837Z",
} as const satisfies SelectProperty
