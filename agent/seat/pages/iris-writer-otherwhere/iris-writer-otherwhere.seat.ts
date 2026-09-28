import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhere = {
  id: "01a0e985-f561-7000-9c77-de217d7ea50f",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
