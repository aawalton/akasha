import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elaine = {
  id: "01a10c93-413a-7000-99c6-9c7a14d0c226",
  type: "page-type/seat",
  slug: "elaine",
  persona: "persona/elaine",
  assignmentSlug: "domain/medicine",
  role: "role/coach",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
