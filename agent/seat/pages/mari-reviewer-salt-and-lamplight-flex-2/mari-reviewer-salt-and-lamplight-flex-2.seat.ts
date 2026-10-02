import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerSaltAndLamplightFlex2 = {
  id: "01a0fd26-c149-7000-92aa-633f043780c1",
  type: "page-type/seat",
  slug: "mari-reviewer-salt-and-lamplight-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/salt-and-lamplight",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
