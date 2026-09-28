import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereIvFlex1 = {
  id: "01a0ea12-a144-7000-b9f6-46c65e36fdce",
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
