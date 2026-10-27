import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterBeatFlowTest = {
  id: "01a17f87-3cfe-7565-bbdc-a008a29cef8f",
  type: "page-type/seat",
  slug: "iris-writer-beat-flow-test",
  persona: "persona/iris",
  assignmentSlug: "story-played/beat-flow-test",
  role: "role/writer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "edf2916b-3df0-4c4d-ae1d-8e99cb7a4c10",
  createdAt: "2026-10-27T22:42:12.283Z",
  updatedAt: "2026-10-27T22:42:16.582Z",
} as const satisfies Seat
