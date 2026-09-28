import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereVFlex1 = {
  id: "01a0ea09-fffe-7000-abb8-c21d8acdb685",
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
