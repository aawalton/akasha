import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhere = {
  id: "01a0e357-d723-7000-8b36-3ef7c9a77a26",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
