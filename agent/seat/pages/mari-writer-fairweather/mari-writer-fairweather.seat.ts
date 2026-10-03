import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterFairweather = {
  id: "01a10387-235c-7000-a521-edb3f0e6a0f9",
  type: "page-type/seat",
  slug: "mari-writer-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
