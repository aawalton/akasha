import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEncountersFlex3 = {
  id: "01a11340-50c7-7000-a2ee-288d30e2382a",
  type: "page-type/seat",
  slug: "mari-reviewer-encounters-flex-3",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
