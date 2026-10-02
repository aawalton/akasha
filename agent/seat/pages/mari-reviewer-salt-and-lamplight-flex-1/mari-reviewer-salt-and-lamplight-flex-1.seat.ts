import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerSaltAndLamplightFlex1 = {
  id: "01a0fd26-9fc6-7000-bceb-4c334be55665",
  type: "page-type/seat",
  slug: "mari-reviewer-salt-and-lamplight-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/salt-and-lamplight",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "ad5eee54-d83e-4819-8789-c6ac3b5a534a",
} as const satisfies Seat
