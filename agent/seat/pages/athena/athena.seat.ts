import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const athena = {
  id: "01a0d3de-5833-7000-b90e-a639d4f99cd4",
  type: "page-type/seat",
  slug: "athena",
  persona: "persona/athena",
  assignmentSlug: "initiative/athena-interactive-seat-pages",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "573171a3-7602-4fac-b8e2-d2e1522d978d",
} as const satisfies Seat
