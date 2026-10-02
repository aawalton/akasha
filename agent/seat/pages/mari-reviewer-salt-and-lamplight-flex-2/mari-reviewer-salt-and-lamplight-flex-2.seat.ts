import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerSaltAndLamplightFlex2 = {
  id: "01a0fd3f-7798-7000-9627-e060cc3c776a",
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
