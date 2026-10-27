import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterGiftedReborn = {
  id: "01a17fb8-02e7-77e8-80a2-dc56ede90d82",
  type: "page-type/seat",
  slug: "iris-game-master-gifted-reborn",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-reborn",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e16c596e-ad61-4021-98b3-df8e157d01f0",
  createdAt: "2026-10-27T23:35:28.785Z",
  updatedAt: "2026-10-27T23:35:31.976Z",
} as const satisfies Seat
