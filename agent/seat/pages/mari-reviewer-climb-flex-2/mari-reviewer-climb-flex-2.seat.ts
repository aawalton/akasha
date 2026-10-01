import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerClimbFlex2 = {
  id: "01a0f96c-e9aa-7000-a8f6-95f006447c1a",
  type: "page-type/seat",
  slug: "mari-reviewer-climb-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "ecb1b582-82ec-440a-9ebf-704b9011e79b",
} as const satisfies Seat
