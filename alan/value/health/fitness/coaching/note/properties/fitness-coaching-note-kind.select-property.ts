import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const fitnessCoachingNoteKind = {
  id: "01a0657a-fe00-7149-b974-3ad13dd29e09",
  type: "page-type/select-property",
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
  types: "ts",
  createdAt: "2026-09-03T04:15:54.368Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
