import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEmberdeepFlex2 = {
  id: "01a0fe77-9dcb-7000-8afc-7e45a099b615",
  type: "page-type/seat",
  slug: "mari-reviewer-emberdeep-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/emberdeep",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e6ccaaa4-935f-4bd2-8312-a1c18c205072",
} as const satisfies Seat
