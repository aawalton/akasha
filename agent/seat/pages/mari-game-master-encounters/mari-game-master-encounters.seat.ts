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
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
