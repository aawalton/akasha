import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereXi = {
  id: "01a0ea64-afce-7000-b5e9-8dd0f5111b09",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-xi",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-xi",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
