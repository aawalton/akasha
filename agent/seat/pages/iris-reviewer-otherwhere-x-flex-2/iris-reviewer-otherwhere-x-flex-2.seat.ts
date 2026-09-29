import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereXFlex2 = {
  id: "01a0eafd-abd7-7000-a794-1fb488ecb2dc",
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
