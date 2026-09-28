import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterHaremHotel = {
  id: "01a0e839-6499-7000-8fff-75f8657efd98",
  type: "page-type/seat",
  slug: "mari-writer-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-played/harem-hotel",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
