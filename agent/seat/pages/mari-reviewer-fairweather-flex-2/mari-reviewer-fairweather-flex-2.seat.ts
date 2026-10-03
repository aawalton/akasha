import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex2 = {
  id: "01a1037c-5dcd-7000-ba4a-560cba07390f",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
