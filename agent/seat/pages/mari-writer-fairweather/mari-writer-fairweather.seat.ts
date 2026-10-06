import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterFairweather = {
  id: "01a11323-ed27-7000-9105-958dfd010276",
  type: "page-type/seat",
  slug: "mari-writer-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "cd6034c7-b3ff-4afa-af9f-585154e0125e",
} as const satisfies Seat
