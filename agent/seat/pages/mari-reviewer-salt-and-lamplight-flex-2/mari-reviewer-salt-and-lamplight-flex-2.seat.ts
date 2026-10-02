import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerSaltAndLamplightFlex2 = {
  id: "01a0fd10-6278-7000-a8ce-5b17a5b59f7c",
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
