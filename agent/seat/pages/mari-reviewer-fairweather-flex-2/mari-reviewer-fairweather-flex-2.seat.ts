import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex2 = {
  id: "01a103c8-b19e-7000-8103-04fb552019f9",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "312b483a-cefb-401f-a4b6-94d8c1bd9f4e",
} as const satisfies Seat
