import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterHaremHotel = {
  id: "01a0eb68-509d-7000-85d7-474ba0d0c3bb",
  type: "page-type/seat",
  slug: "mari-writer-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-written/harem-hotel",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
