import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const vera = {
  id: "01a0a57a-558c-7000-be79-dc1f16c5f0db",
  type: "page-type/seat",
  slug: "vera",
  persona: "persona/vera",
  assignmentSlug: "initiative/vera-graph-cleanup",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "0df472d2-33c6-459e-9f13-ac731c952145",
} as const satisfies Seat
