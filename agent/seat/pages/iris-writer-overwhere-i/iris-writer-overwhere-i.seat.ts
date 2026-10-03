import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOverwhereI = {
  id: "01a103cc-437a-7000-abc0-cc06b0577f45",
  type: "page-type/seat",
  slug: "iris-writer-overwhere-i",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-i",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
