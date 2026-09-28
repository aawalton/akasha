import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereVFlex1 = {
  id: "01a0ea37-e79c-7000-aa0c-9ee390f05e52",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-v-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-v",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
