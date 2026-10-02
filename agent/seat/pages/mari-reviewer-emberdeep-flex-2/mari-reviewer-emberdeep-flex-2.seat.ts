import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEmberdeepFlex2 = {
  id: "01a0fe37-3e4e-7000-ac23-0ec858b246ae",
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
