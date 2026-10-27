import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderCloneProbe = {
  id: "01a17f5b-b4a2-70ee-b481-eaa86ac4de17",
  type: "page-type/seat",
  slug: "iris-world-builder-clone-probe",
  persona: "persona/iris",
  assignmentSlug: "story-played/clone-probe",
  role: "role/world-builder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T21:54:39.300Z",
  updatedAt: "2026-10-27T21:54:39.300Z",
} as const satisfies Seat
