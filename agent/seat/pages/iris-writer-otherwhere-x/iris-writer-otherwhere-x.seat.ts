import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereX = {
  id: "01a0ea62-0368-7000-b593-281966d92536",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-x",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-x",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "a69c51d4-33f1-4bc9-83ec-10d448ef591c",
} as const satisfies Seat
