import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterFairweather = {
  id: "01a113ee-0fa5-7000-87aa-05d30fdffaa9",
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
