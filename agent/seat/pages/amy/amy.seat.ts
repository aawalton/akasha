import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const amy = {
  id: "01a18391-9072-7560-b73e-11d032ca1d67",
  type: "page-type/seat",
  slug: "amy",
  persona: "persona/amy",
  assignmentSlug: "domain/alan-harness",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "7d3dd549-a72b-4dd0-b4a0-7bdb5e627809",
  createdAt: "2026-10-28T17:31:57.820Z",
  updatedAt: "2026-10-28T17:32:00.786Z",
} as const satisfies Seat
