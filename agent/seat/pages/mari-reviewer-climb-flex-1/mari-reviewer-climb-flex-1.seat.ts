import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerClimbFlex1 = {
  id: "01a0f96c-cdb7-7000-9165-7288a38fd5ba",
  type: "page-type/seat",
  slug: "mari-reviewer-climb-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "9bfbbf87-f346-4feb-acbb-e124529b0fa4",
} as const satisfies Seat
