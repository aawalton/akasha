import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerGiftedRebornFlex1 = {
  id: "01a17fcd-308e-7693-9892-e35a4b200de3",
  type: "page-type/seat",
  slug: "iris-reviewer-gifted-reborn-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-reborn",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T23:58:36.661Z",
  updatedAt: "2026-10-27T23:58:36.661Z",
} as const satisfies Seat
