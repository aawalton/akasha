import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aranya = {
  id: "01a0ca93-4085-7000-9820-b81a6bfb3601",
  type: "page-type/seat",
  slug: "aranya",
  persona: "persona/aranya",
  assignmentSlug: "domain/infrastructure",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
