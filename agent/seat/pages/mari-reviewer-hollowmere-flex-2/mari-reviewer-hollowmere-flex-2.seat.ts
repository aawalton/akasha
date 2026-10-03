import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex2 = {
  id: "01a101e9-ac60-7000-b15a-096bc095f3d6",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "8fead4f8-206b-46d4-a165-790f1ac0e51f",
} as const satisfies Seat
