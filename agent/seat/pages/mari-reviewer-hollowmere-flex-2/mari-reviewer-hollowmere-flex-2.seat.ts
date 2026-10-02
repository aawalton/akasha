import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex2 = {
  id: "01a0fd78-9f1c-7000-87dc-4775edc560db",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "455df6c0-8312-407d-9012-b3eea0489baf",
} as const satisfies Seat
