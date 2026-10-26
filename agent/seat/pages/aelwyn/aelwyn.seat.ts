import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aelwyn = {
  id: "01a115b8-3fdb-7000-b6c3-6f3accbd4b13",
  type: "page-type/seat",
  slug: "aelwyn",
  persona: "persona/aelwyn",
  assignmentSlug: "domain/fitness",
  role: "role/coach",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "9d7d0f46-4969-4b19-9eae-2af3c7d4e0d3",
  createdAt: "2026-10-26T12:02:34.001Z",
  updatedAt: "2026-10-26T12:02:34.001Z",
} as const satisfies Seat
