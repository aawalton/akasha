import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterProbeTwo = {
  id: "01a17fc5-95bb-7026-8b01-62db90111d43",
  type: "page-type/seat",
  slug: "iris-writer-probe-two",
  persona: "persona/iris",
  assignmentSlug: "story-played/probe-two",
  role: "role/writer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T23:50:18.180Z",
  updatedAt: "2026-10-27T23:50:18.180Z",
} as const satisfies Seat
