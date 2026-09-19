import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a0b740-8601-7000-9e6d-2dafdd3a81d1",
  type: "page-type/seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "page-type/finding",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
