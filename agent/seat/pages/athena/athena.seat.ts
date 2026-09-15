import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const athena = {
  id: "01a0a2cb-dbb0-7000-bb77-9613bb90fe09",
  type: "seat",
  slug: "athena",
  persona: "persona/athena",
  assignmentSlug: "namespace/agent",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "9fa41950-a9f3-43c1-bdfe-8728d1202afe",
} as const satisfies Seat
