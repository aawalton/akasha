import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOutcomeCardsCheckFlex1 = {
  id: "01a18027-6184-7577-b960-b37556da9322",
  type: "page-type/seat",
  slug: "iris-reviewer-outcome-cards-check-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/outcome-cards-check",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e2b38b48-3980-405c-95bf-29b8d63012ea",
  createdAt: "2026-10-28T01:37:07.275Z",
  updatedAt: "2026-10-28T01:37:10.807Z",
} as const satisfies Seat
