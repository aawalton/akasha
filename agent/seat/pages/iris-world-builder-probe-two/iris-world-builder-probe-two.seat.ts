import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderProbeTwo = {
  id: "01a17fc5-5dd3-70e6-8e03-b41edd312cd6",
  type: "page-type/seat",
  slug: "iris-world-builder-probe-two",
  persona: "persona/iris",
  assignmentSlug: "story-played/probe-two",
  role: "role/world-builder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "ab623e76-9292-418f-9314-774cf5127c18",
  createdAt: "2026-10-27T23:50:03.908Z",
  updatedAt: "2026-10-27T23:50:09.868Z",
} as const satisfies Seat
