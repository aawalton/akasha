import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereFlex1 = {
  id: "01a0e5ec-8720-7000-aba7-617b5e454349",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "1e435aeb-8e30-497b-b333-b243232b85e1",
} as const satisfies Seat
