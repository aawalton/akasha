import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOutcomeCardsCheck = {
  id: "01a1801d-88c3-7133-b53f-197e95b4607d",
  type: "page-type/seat",
  slug: "iris-game-master-outcome-cards-check",
  persona: "persona/iris",
  assignmentSlug: "story-played/outcome-cards-check",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "cf86d784-11ca-403a-85b8-367e3d9fbd61",
  createdAt: "2026-10-28T01:26:22.182Z",
  updatedAt: "2026-10-28T01:26:25.604Z",
} as const satisfies Seat
