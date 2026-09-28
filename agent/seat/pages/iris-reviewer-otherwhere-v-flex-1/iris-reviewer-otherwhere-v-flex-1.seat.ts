import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereVFlex1 = {
  id: "01a0ea15-2a77-7000-9b25-63506ced52b1",
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
