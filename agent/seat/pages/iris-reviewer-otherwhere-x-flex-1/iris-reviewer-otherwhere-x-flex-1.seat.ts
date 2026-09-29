import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereXFlex1 = {
  id: "01a0eabf-add2-7000-9290-d29ebd3adbea",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-x-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-x",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
