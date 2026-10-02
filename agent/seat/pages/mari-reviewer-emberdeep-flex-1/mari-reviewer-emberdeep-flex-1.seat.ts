import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEmberdeepFlex1 = {
  id: "01a0fe89-ea47-7000-9881-96b9b44de861",
  type: "page-type/seat",
  slug: "mari-reviewer-emberdeep-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/emberdeep",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "d8dec7b8-383c-4e9f-8742-f7695271a2ee",
} as const satisfies Seat
