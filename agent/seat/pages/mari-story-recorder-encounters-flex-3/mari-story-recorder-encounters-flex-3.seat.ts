import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderEncountersFlex3 = {
  id: "01a11337-6bd2-7000-962b-ae2fd7a486cd",
  type: "page-type/seat",
  slug: "mari-story-recorder-encounters-flex-3",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
