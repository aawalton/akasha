import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderEncountersFlex4 = {
  id: "01a11337-aa02-7000-9b58-05dca0e9eefe",
  type: "page-type/seat",
  slug: "mari-story-recorder-encounters-flex-4",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
