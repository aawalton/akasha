import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex1 = {
  id: "01a102d7-21c0-7000-ae9e-930ee1a9c907",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
