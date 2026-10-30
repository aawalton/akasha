import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterGiftedPolish = {
  id: "01a18e17-bb63-7257-a949-d74c2139b9b0",
  type: "page-type/seat",
  slug: "iris-game-master-gifted-polish",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-polish",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-30T18:34:43.010Z",
  updatedAt: "2026-10-30T18:34:43.010Z",
} as const satisfies Seat
