import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEncountersFlex2 = {
  id: "01a11340-1531-7000-8bb6-7ec537751439",
  type: "page-type/seat",
  slug: "mari-reviewer-encounters-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "40dd962b-46f6-487f-b49e-d184bb8c50ab",
} as const satisfies Seat
