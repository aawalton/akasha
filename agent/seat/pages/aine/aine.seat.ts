import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a0c498-5534-7000-9089-f11a61d6d873",
  type: "page-type/seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "domain/contribution-point",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "8913b797-cf55-4a1d-bfa5-0b9f7bce6b0d",
} as const satisfies Seat
