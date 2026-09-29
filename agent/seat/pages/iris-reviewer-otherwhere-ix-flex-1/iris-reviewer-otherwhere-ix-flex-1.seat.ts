import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereIxFlex1 = {
  id: "01a0ea8e-463f-7000-a508-de3b0ea1923c",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-ix-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-ix",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
