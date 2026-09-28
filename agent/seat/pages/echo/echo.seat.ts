import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const echo = {
  id: "01a0e922-2e4e-7000-a79a-c49e31fb4002",
  type: "page-type/seat",
  slug: "echo",
  persona: "persona/echo",
  assignmentSlug: "domain/narrative-production",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "98ae42f6-3def-4205-ae6f-c416440a5bc8",
} as const satisfies Seat
