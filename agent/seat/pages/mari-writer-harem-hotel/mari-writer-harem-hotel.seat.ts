import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterHaremHotel = {
  id: "01a0e98c-0583-7000-aa64-2259aebbe753",
  type: "page-type/seat",
  slug: "mari-writer-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-written/harem-hotel",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "0d375fbc-1332-45d0-b879-78d2f6c27258",
} as const satisfies Seat
