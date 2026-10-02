import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOverwhereIFlex1 = {
  id: "01a0fe69-9a2d-7000-86b8-09b877c0c326",
  type: "page-type/seat",
  slug: "iris-reviewer-overwhere-i-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-i",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
