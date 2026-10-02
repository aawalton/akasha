import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEmberdeepFlex2 = {
  id: "01a0fdfb-8126-7000-b750-8a8177594d8c",
  type: "page-type/seat",
  slug: "mari-reviewer-emberdeep-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/emberdeep",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
