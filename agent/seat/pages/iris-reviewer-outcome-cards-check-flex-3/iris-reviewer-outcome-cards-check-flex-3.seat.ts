import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOutcomeCardsCheckFlex3 = {
  id: "01a18027-a4bc-71fa-894e-ed142f9a5142",
  type: "page-type/seat",
  slug: "iris-reviewer-outcome-cards-check-flex-3",
  persona: "persona/iris",
  assignmentSlug: "story-played/outcome-cards-check",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-28T01:37:24.468Z",
  updatedAt: "2026-10-28T01:37:24.468Z",
} as const satisfies Seat
