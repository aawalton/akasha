import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const amy = {
  id: "01a14f20-9e11-7000-a53b-1e2e9cc76a9a",
  type: "page-type/seat",
  slug: "amy",
  persona: "persona/amy",
  assignmentSlug: "domain/alan-harness",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "57b109d6-2f11-4729-9004-745a6b6400ab",
  createdAt: "2026-10-24T18:49:20.691Z",
  updatedAt: "2026-10-24T18:49:20.691Z",
} as const satisfies Seat
