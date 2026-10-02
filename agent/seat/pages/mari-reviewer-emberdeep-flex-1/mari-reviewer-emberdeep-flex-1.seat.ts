import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEmberdeepFlex1 = {
  id: "01a0fe77-75f0-7000-8109-02175e1796cb",
  type: "page-type/seat",
  slug: "mari-reviewer-emberdeep-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/emberdeep",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "175445c7-3386-4505-97b8-f0fba99a450b",
} as const satisfies Seat
