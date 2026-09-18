import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const athena = {
  id: "01a0b4d8-e302-7000-8915-39c731e2e99f",
  type: "page-type/seat",
  slug: "athena",
  persona: "persona/athena",
  assignmentSlug: "namespace/agent",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
