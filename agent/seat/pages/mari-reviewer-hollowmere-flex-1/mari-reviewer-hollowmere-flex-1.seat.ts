import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex1 = {
  id: "01a10185-9714-7000-9006-d80cd1213748",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "0948dff8-9d62-431b-b2e1-3726a4484e13",
} as const satisfies Seat
