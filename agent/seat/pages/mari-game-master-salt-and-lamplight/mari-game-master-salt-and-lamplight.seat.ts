import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterSaltAndLamplight = {
  id: "01a0fd06-926b-7000-ac52-3297e16968da",
  type: "page-type/seat",
  slug: "mari-game-master-salt-and-lamplight",
  persona: "persona/mari",
  assignmentSlug: "story-written/salt-and-lamplight",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "5bedc2cf-9452-464e-93b0-ea8e3658a61a",
} as const satisfies Seat
