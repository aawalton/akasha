import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereVFlex2 = {
  id: "01a0e9f9-3c1c-7000-915c-0b83a17fbdc0",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-v-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-v",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
