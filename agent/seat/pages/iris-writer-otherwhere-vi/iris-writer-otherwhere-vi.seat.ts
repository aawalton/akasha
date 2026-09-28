import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereVi = {
  id: "01a0ea20-4c10-7000-b95d-62a4f8e08899",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-vi",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-vi",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
