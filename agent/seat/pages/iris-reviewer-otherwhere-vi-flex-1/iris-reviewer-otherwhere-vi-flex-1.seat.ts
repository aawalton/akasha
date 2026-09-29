import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereViFlex1 = {
  id: "01a0eb22-72e6-7000-9a9b-80ab7888c0f2",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-vi-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-vi",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
