import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const athena = {
  id: "01a0dee6-2a6a-7000-acb3-3a436db6679a",
  type: "page-type/seat",
  slug: "athena",
  persona: "persona/athena",
  assignmentSlug: "namespace/agent",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
