import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterEncounters = {
  id: "01a11327-454f-7000-ab85-b1f3164e9d17",
  type: "page-type/seat",
  slug: "mari-game-master-encounters",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "9c146045-8ea7-4df0-8ad7-590baf93582f",
} as const satisfies Seat
