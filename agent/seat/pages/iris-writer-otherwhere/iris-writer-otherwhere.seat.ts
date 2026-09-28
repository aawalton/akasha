import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhere = {
  id: "01a0e930-dd6a-7000-8e47-89625f505054",
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
