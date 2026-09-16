import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a0aa76-dc2d-7000-89a9-9c6510c3dc58",
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
