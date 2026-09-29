import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOverwhereI = {
  id: "01a0ed0e-966e-7000-914b-051e15da326e",
  type: "page-type/seat",
  slug: "iris-writer-overwhere-i",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-i",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
