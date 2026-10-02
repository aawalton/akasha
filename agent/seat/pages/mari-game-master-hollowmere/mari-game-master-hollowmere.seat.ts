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
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "49a3bccc-bb47-4e43-8796-cfbd7151ca70",
} as const satisfies Seat
