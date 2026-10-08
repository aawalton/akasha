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
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "f8d5910f-aaf3-4ce2-8079-db8a4c1b9f4d",
  updatedAt: "2026-10-08T15:37:45.392Z",
} as const satisfies Seat
