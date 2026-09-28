import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereVii = {
  id: "01a0ea20-d8bd-7000-b9fe-017e1f3fb89a",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-vii",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-vii",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
