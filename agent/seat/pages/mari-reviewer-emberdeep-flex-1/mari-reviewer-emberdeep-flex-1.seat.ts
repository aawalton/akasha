import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEmberdeepFlex1 = {
  id: "01a0fdde-e4f3-7000-a07b-6602c4d742c0",
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
