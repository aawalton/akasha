import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderEncountersFlex5 = {
  id: "01a1132d-73f1-7000-85aa-138cc7f947cf",
  type: "page-type/seat",
  slug: "mari-story-recorder-encounters-flex-5",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
