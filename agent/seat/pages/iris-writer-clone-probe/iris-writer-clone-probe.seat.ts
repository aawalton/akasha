import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterCloneProbe = {
  id: "01a17f5b-ea87-777c-9443-a767ca6ee4c8",
  type: "page-type/seat",
  slug: "iris-writer-clone-probe",
  persona: "persona/iris",
  assignmentSlug: "story-played/clone-probe",
  role: "role/writer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T21:54:53.063Z",
  updatedAt: "2026-10-27T21:54:53.063Z",
} as const satisfies Seat
