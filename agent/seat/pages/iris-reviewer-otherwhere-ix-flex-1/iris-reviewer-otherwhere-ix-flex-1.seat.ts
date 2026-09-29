import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereIxFlex1 = {
  id: "01a0eb2b-8125-7000-af3b-d1328945f055",
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
