import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereViii = {
  id: "01a0ea21-7756-7000-8d81-408d39d4903f",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-viii",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-viii",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
