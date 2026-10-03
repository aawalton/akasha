import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex2 = {
  id: "01a0ff46-4adb-7000-80cf-af099d90d0de",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e8a480ee-f9f4-4ea0-9cd6-ab32c44fbea2",
} as const satisfies Seat
