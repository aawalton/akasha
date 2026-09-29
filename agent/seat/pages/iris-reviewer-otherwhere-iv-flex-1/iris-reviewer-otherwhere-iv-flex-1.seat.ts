import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereIvFlex1 = {
  id: "01a0eb13-bf9d-7000-9c06-6431ad7d8488",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-iv-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-iv",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
