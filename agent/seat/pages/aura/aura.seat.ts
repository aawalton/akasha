import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aura = {
  id: "01a0a694-170d-7000-bd6a-fd722d217073",
  type: "page-type/seat",
  slug: "aura",
  persona: "persona/aura",
  assignmentSlug: "domain/design-game",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
