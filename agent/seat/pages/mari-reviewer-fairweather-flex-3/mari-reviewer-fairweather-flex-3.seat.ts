import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex3 = {
  id: "01a102d7-762d-7000-8697-c96fdd9e9c2a",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-3",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "8e7aab5c-ec15-4348-8e01-f7eeb128a0f0",
} as const satisfies Seat
