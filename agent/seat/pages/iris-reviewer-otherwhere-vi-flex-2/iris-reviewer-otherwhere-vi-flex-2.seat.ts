import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereViFlex2 = {
  id: "01a0eb22-8897-7000-a93a-e09823ee898a",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-vi-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-vi",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
