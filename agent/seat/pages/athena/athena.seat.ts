import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const athena = {
  id: "01a0b6b3-19cd-7000-8924-d9f94f38dc5e",
  type: "page-type/seat",
  slug: "athena",
  persona: "persona/athena",
  assignmentSlug: "namespace/agent",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "c2d01bc1-7ef4-45a1-a06d-562a0add5c83",
} as const satisfies Seat
