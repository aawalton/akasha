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
  createdAt: "2026-10-28T01:26:36.067Z",
  updatedAt: "2026-10-28T01:26:36.067Z",
} as const satisfies Seat
