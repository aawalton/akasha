import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterFairweather = {
  id: "01a112fb-666a-7000-824b-7a530be36b15",
  type: "page-type/seat",
  slug: "mari-writer-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
