import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereFlex2 = {
  id: "01a0e9d5-b0de-7000-bf49-c653dc52533f",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "a6a5ff8d-4677-4402-8269-5421fc264011",
} as const satisfies Seat
