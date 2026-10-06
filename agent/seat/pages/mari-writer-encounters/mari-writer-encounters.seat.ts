import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterEncounters = {
  id: "01a11327-6f34-7000-a741-eaba9ec3ad25",
  type: "page-type/seat",
  slug: "mari-writer-encounters",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
