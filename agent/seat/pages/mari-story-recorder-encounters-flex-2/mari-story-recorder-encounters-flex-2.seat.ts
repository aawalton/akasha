import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderEncountersFlex2 = {
  id: "01a1132d-346c-7000-8791-1f10b8b7bfe6",
  type: "page-type/seat",
  slug: "mari-story-recorder-encounters-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
