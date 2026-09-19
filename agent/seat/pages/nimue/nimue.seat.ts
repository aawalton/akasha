import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nimue = {
  id: "01a0babf-8ce8-7000-b412-bb0094c9a1c3",
  type: "page-type/seat",
  slug: "nimue",
  persona: "persona/nimue",
  assignmentSlug: "domain/technology",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "14d130b5-3001-4587-b0d9-0aab4ec34c06",
} as const satisfies Seat
