import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex2 = {
  id: "01a102d7-4d57-7000-9022-d08de4136eeb",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "0b60a425-955d-4ee8-8494-b46934450f52",
} as const satisfies Seat
