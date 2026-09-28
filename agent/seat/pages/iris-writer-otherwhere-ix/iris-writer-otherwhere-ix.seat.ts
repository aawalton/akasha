import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereIx = {
  id: "01a0ea22-4ea6-7000-ba58-ca59f60a63b3",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-ix",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-ix",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
