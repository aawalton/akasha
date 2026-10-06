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
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "b6d1dffb-9ca0-4f73-9515-4155163279be",
} as const satisfies Seat
