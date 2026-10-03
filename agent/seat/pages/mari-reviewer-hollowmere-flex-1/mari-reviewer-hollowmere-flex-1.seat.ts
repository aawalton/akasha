import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex1 = {
  id: "01a10222-340a-7000-846d-fe9dd0a3ddf8",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "b0d6b2a5-2240-44ce-821f-00837b96a41b",
} as const satisfies Seat
