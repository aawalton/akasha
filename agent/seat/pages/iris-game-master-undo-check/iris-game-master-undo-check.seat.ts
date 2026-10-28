import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterUndoCheck = {
  id: "01a1830c-7792-7173-b028-8a4f862fbbef",
  type: "page-type/seat",
  slug: "iris-game-master-undo-check",
  persona: "persona/iris",
  assignmentSlug: "story-played/undo-check",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "471d7d1e-64ba-4fdf-8a74-798cfded5953",
  createdAt: "2026-10-28T15:06:35.426Z",
  updatedAt: "2026-10-28T15:06:39.378Z",
} as const satisfies Seat
