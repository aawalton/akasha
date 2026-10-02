import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterHollowmere = {
  id: "01a0fd11-824a-7000-84ce-f8c69513fb3e",
  type: "page-type/seat",
  slug: "mari-writer-hollowmere",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "451f3510-946b-4b21-a301-61215ea3e073",
} as const satisfies Seat
