import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereIii = {
  id: "01a0e9d5-5dae-7000-a9e9-ddcdf35e7fc7",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-iii",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-iii",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
