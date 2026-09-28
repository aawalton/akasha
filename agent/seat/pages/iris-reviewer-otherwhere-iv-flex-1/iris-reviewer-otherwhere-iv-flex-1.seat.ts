import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereIvFlex1 = {
  id: "01a0ea59-4bd0-7000-a5ea-2e79a6bbebcd",
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
