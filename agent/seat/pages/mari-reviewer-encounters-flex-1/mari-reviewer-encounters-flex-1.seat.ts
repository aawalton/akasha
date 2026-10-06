import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEncountersFlex1 = {
  id: "01a1133f-d9d4-7000-882b-bb7fe5ea6b91",
  type: "page-type/seat",
  slug: "mari-reviewer-encounters-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
