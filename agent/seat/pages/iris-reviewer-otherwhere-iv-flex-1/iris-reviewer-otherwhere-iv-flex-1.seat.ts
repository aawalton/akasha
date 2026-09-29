import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereIvFlex1 = {
  id: "01a0eab8-5053-7000-8d7b-b16de5bccdcd",
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
