import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerClimbFlex2 = {
  id: "01a0f962-d172-7000-9ed7-00f5415f559a",
  type: "page-type/seat",
  slug: "mari-reviewer-climb-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "3e56c884-dab1-4094-9f4a-93739c8e1bf6",
} as const satisfies Seat
