import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOverwhereIFlex1 = {
  id: "01a0f14b-0233-7000-a3e5-a0470c20ba39",
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
