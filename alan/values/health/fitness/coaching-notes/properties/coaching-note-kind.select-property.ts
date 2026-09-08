import type { SelectProperty } from "@akasha/pages/select-property"

export const coachingNoteKind = {
  id: "01a0657a-fe00-7149-b974-3ad13dd29e09",
  pageTypeSlug: "select-property",
  slug: "coaching-note-kind",
  propertySlug: "coaching-note-kind",
  definition: "what sort of note this is",
  values: [
    "medical-gate",
    "programming-cue",
    "equipment-ceiling",
    "injury-watch",
    "ef-accommodation",
  ],
} as const satisfies SelectProperty

export type CoachingNoteKind = (typeof coachingNoteKind.values)[number]
