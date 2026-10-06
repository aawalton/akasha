import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterFairweather = {
  id: "01a11323-72a2-7000-8570-11cb04c01daa",
  type: "page-type/seat",
  slug: "mari-game-master-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "f5f2f37e-34ac-40a3-98b2-2197b7812704",
} as const satisfies Seat
