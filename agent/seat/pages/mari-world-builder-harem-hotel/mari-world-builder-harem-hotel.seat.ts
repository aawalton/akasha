import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderHaremHotel = {
  id: "01a0e98b-d149-7000-ac6a-471bf6037fc3",
  type: "page-type/seat",
  slug: "mari-world-builder-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-written/harem-hotel",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
