import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nimue = {
  id: "01a0d384-ad92-7000-8b31-29df3500e22f",
  type: "page-type/seat",
  slug: "nimue",
  persona: "persona/nimue",
  assignmentSlug: "domain/technology",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "e47623bc-bfdf-4266-8dac-dcff7ba5fedb",
} as const satisfies Seat
