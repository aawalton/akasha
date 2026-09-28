import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereIxFlex1 = {
  id: "01a0ea47-563b-7000-8740-62c18d49804b",
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
