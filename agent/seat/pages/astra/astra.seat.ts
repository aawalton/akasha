import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const astra = {
  id: "01a0a678-a7f7-7000-9c3a-bac521580d35",
  type: "page-type/seat",
  slug: "astra",
  persona: "persona/astra",
  assignmentSlug: "namespace/page",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
