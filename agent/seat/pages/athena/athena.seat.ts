import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const athena = {
  id: "01a11c03-924a-7000-8151-0c76e2fa99e6",
  type: "page-type/seat",
  slug: "athena",
  persona: "persona/athena",
  assignmentSlug: "namespace/agent",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e7b43ca2-a8a6-438d-ad61-03369afdc533",
  updatedAt: "2026-10-08T15:11:52.713Z",
} as const satisfies Seat
