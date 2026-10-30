import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterGiftedTrial2 = {
  id: "01a18db2-76c7-71c2-9014-f09a71ccc5ba",
  type: "page-type/seat",
  slug: "iris-game-master-gifted-trial2",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-trial2",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-30T16:44:07.687Z",
  updatedAt: "2026-10-30T16:44:07.687Z",
} as const satisfies Seat
