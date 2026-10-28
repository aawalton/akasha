import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterUndoCheck = {
  id: "01a1830c-eeb5-7082-b000-d04cc10c2db5",
  type: "page-type/seat",
  slug: "iris-writer-undo-check",
  persona: "persona/iris",
  assignmentSlug: "story-played/undo-check",
  role: "role/writer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "6e46ccf1-7443-4b8e-97bd-525513056398",
  createdAt: "2026-10-28T15:07:05.744Z",
  updatedAt: "2026-10-28T15:07:11.561Z",
} as const satisfies Seat
