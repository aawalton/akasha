import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOverwhereIFlex2 = {
  id: "01a0fd08-d300-7000-837f-4bbdd85f000d",
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
