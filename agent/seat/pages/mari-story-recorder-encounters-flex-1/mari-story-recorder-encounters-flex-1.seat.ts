import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderEncountersFlex1 = {
  id: "01a1132c-f737-7000-aef4-d1b99e045db1",
  type: "page-type/seat",
  slug: "mari-story-recorder-encounters-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
