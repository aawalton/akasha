import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerClimbFlex1 = {
  id: "01a0f962-b5c3-7000-abc7-49fda5d5446a",
  type: "page-type/seat",
  slug: "mari-reviewer-climb-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
