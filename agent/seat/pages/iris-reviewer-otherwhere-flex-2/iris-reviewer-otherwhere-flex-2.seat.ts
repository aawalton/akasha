import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereFlex2 = {
  id: "01a0e49d-e648-7000-b44e-f111675b7581",
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
