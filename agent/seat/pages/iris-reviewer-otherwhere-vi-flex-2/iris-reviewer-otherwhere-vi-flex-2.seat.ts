import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereViFlex2 = {
  id: "01a0ea89-9da7-7000-9423-327a05177853",
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
