import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex3 = {
  id: "01a1037c-839b-7000-a01e-6ba6a4418536",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-3",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "eaed4014-da28-4e62-86e9-67396aa6c8c4",
} as const satisfies Seat
