import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEmberdeepFlex1 = {
  id: "01a0fe37-1b88-7000-8836-f2e53e7490eb",
  type: "page-type/seat",
  slug: "mari-reviewer-emberdeep-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/emberdeep",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
