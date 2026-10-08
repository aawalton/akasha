import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const echo = {
  id: "01a11c04-3979-7000-a8f0-e63e6f41758b",
  type: "page-type/seat",
  slug: "echo",
  persona: "persona/echo",
  assignmentSlug: "domain/narrative-production",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
