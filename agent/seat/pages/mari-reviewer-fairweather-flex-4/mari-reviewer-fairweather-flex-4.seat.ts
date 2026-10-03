import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex4 = {
  id: "01a102d7-9e63-7000-9059-59b4659af769",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-4",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "8a53ad28-afb6-4ab1-bba7-6a8cbc2ff0b4",
} as const satisfies Seat
