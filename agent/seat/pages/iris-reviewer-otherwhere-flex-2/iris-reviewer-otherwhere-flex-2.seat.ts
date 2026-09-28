import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereFlex2 = {
  id: "01a0e5ac-aa8e-7000-83b1-a02858f57afc",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
