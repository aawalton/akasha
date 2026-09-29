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
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "13215ad0-bb40-4abc-aa96-6212d0b7aa8c",
} as const satisfies Seat
