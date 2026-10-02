import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex2 = {
  id: "01a0fd9c-4380-7000-8523-79e2cedfa1ef",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "5d163a1e-1fb5-49a4-8e8b-f55822f97c78",
} as const satisfies Seat
