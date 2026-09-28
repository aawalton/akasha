import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereIv = {
  id: "01a0e9e2-9c1c-7000-83d8-5409fc0d90f2",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-iv",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-iv",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
