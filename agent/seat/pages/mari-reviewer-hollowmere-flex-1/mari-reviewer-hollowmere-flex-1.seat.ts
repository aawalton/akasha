import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex1 = {
  id: "01a10201-4335-7000-b0b8-da038b94e377",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "0feeac7b-28f9-4c19-a989-d560a17ec3c1",
} as const satisfies Seat
