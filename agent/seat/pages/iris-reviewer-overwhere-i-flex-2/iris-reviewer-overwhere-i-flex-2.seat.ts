import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOverwhereIFlex2 = {
  id: "01a0f477-9d7c-7000-ac46-5585434ee000",
  type: "page-type/seat",
  slug: "iris-reviewer-overwhere-i-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-i",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
