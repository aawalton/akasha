import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterHollowmere = {
  id: "01a0fd11-15d1-7000-8e49-2de88d975cfc",
  type: "page-type/seat",
  slug: "mari-game-master-hollowmere",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
