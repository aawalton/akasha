import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereViFlex1 = {
  id: "01a0ea89-82b9-7000-bb7a-44738c016b3b",
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
