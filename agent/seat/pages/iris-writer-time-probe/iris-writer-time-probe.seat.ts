import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterTimeProbe = {
  id: "01a18031-b42a-77a8-a206-57fbb1cd95b7",
  type: "page-type/seat",
  slug: "iris-writer-time-probe",
  persona: "persona/iris",
  assignmentSlug: "story-played/time-probe",
  role: "role/writer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "7ae93777-e7a3-485a-94bd-686b4274e5e2",
  createdAt: "2026-10-28T01:48:23.857Z",
  updatedAt: "2026-10-28T01:48:27.594Z",
} as const satisfies Seat
