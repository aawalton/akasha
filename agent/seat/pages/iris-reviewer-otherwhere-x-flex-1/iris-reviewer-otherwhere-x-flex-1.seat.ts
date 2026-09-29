import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereXFlex1 = {
  id: "01a0eb2e-a48b-7000-a6cf-91eb0927a67f",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-x-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-x",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
