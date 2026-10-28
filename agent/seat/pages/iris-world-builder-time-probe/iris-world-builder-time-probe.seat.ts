import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderTimeProbe = {
  id: "01a18031-7cf2-73da-b6ee-3f8b63655b5b",
  type: "page-type/seat",
  slug: "iris-world-builder-time-probe",
  persona: "persona/iris",
  assignmentSlug: "story-played/time-probe",
  role: "role/world-builder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-28T01:48:09.710Z",
  updatedAt: "2026-10-28T01:48:09.710Z",
} as const satisfies Seat
