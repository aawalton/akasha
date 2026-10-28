import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOutcomeCardsCheckFlex2 = {
  id: "01a18027-82b3-7560-9882-ec9de8c86e42",
  type: "page-type/seat",
  slug: "iris-reviewer-outcome-cards-check-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/outcome-cards-check",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-28T01:37:15.737Z",
  updatedAt: "2026-10-28T01:37:15.737Z",
} as const satisfies Seat
