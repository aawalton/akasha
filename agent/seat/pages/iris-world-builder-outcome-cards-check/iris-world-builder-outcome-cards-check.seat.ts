import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderOutcomeCardsCheck = {
  id: "01a1801d-bfc0-7520-9159-4ed4af0bfcd0",
  type: "page-type/seat",
  slug: "iris-world-builder-outcome-cards-check",
  persona: "persona/iris",
  assignmentSlug: "story-played/outcome-cards-check",
  role: "role/world-builder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "035c9b18-d5a6-4280-933d-47d53d9a6e5e",
  createdAt: "2026-10-28T01:26:36.067Z",
  updatedAt: "2026-10-28T01:26:39.187Z",
} as const satisfies Seat
