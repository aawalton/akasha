import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex2 = {
  id: "01a0fdb2-5ae6-7000-b68d-90f860833caa",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
