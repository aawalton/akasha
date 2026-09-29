import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereIxFlex1 = {
  id: "01a0eb54-123a-7000-8af0-9aabe714221a",
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
