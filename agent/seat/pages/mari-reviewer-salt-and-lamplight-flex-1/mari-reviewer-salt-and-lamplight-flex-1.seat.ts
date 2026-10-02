import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerSaltAndLamplightFlex1 = {
  id: "01a0fd3f-53a6-7000-b2bd-f1f1a74245be",
  type: "page-type/seat",
  slug: "mari-reviewer-salt-and-lamplight-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/salt-and-lamplight",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
