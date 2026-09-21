import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const olwen = {
  id: "01a0c48f-4201-7000-ba83-55759327b4fd",
  type: "page-type/seat",
  slug: "olwen",
  persona: "persona/olwen",
  assignmentSlug: "domain/design-interface-system",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
