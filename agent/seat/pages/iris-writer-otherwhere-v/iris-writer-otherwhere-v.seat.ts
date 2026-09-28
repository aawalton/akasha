import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterOtherwhereV = {
  id: "01a0e9e5-5113-7000-9fe8-0de362fa1548",
  type: "page-type/seat",
  slug: "iris-writer-otherwhere-v",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-v",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "9f6d56ae-59aa-4851-b95b-0e5d6005b966",
} as const satisfies Seat
