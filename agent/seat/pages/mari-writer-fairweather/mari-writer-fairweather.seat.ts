import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterFairweather = {
  id: "01a102a0-cf88-7000-bd67-99aed1e2d512",
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
