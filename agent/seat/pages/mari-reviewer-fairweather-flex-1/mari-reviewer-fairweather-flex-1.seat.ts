import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex1 = {
  id: "01a1037c-38b4-7000-8273-8acc8f49026a",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "076e42f7-f60c-4b12-aa28-607bcec1201b",
} as const satisfies Seat
