import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOutcomeCardsCheck = {
  id: "01a1801d-f454-7373-90e3-fbe45c0a2f13",
  type: "page-type/seat",
  slug: "iris-writer-outcome-cards-check",
  persona: "persona/iris",
  assignmentSlug: "story-played/outcome-cards-check",
  role: "role/writer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-28T01:26:49.520Z",
  updatedAt: "2026-10-28T01:26:49.520Z",
} as const satisfies Seat
