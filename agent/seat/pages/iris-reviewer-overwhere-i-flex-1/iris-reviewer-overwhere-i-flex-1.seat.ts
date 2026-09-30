import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOverwhereIFlex1 = {
  id: "01a0f157-8a3b-7000-9bb5-7c8ffc52f402",
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
