import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOverwhereIFlex1 = {
  id: "01a0f399-0317-7000-8c39-8158a2f541de",
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
