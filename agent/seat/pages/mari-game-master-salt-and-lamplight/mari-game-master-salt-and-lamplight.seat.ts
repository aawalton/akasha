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
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
