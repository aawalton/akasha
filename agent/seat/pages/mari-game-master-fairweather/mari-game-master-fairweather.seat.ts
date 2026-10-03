import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterFairweather = {
  id: "01a102a0-8221-7000-b0bb-c842fb51090c",
  type: "page-type/seat",
  slug: "mari-game-master-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
