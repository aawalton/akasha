import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereXFlex2 = {
  id: "01a0eabf-c1a8-7000-9c86-97ca4fcd48d2",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-x-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-x",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
