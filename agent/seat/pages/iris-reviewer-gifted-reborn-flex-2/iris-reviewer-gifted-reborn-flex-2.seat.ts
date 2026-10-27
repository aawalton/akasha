import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerGiftedRebornFlex2 = {
  id: "01a17fcd-5472-77ed-a358-62690ad3bc2f",
  type: "page-type/seat",
  slug: "iris-reviewer-gifted-reborn-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-reborn",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T23:58:45.727Z",
  updatedAt: "2026-10-27T23:58:45.727Z",
} as const satisfies Seat
