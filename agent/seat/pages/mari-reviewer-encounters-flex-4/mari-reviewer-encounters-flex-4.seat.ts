import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerEncountersFlex4 = {
  id: "01a11340-8d9a-7000-89ce-360a5af8e70e",
  type: "page-type/seat",
  slug: "mari-reviewer-encounters-flex-4",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
