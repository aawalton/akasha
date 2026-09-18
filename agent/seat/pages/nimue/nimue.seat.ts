import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nimue = {
  id: "01a0b6bd-5242-7000-a372-3e5dc5d1579e",
  type: "page-type/seat",
  slug: "nimue",
  persona: "persona/nimue",
  assignmentSlug: "domain/technology",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "53b7a8a5-23ab-40ca-825e-b4c192ef292b",
} as const satisfies Seat
