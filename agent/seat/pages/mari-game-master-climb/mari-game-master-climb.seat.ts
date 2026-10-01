import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterClimb = {
  id: "01a0f959-18c6-7000-a87f-9ff67995e666",
  type: "page-type/seat",
  slug: "mari-game-master-climb",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "22760fa8-5ccd-4a79-bdc8-c40a610726a7",
} as const satisfies Seat
