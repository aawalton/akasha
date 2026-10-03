import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex1 = {
  id: "01a103c8-8c10-7000-8fa2-06e237d1eeb5",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "0f6103d0-bbae-4ba6-b479-f28fa05f0d90",
} as const satisfies Seat
