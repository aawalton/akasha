import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHollowmereFlex1 = {
  id: "01a101e9-855b-7000-b191-7c0a112fc2b2",
  type: "page-type/seat",
  slug: "mari-reviewer-hollowmere-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
