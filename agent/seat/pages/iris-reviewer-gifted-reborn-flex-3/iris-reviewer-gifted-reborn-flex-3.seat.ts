import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerGiftedRebornFlex3 = {
  id: "01a17fcd-7665-7150-9f98-860f77115930",
  type: "page-type/seat",
  slug: "iris-reviewer-gifted-reborn-flex-3",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-reborn",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T23:58:54.497Z",
  updatedAt: "2026-10-27T23:58:54.497Z",
} as const satisfies Seat
