import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderHaremHotel = {
  id: "01a0e830-aa10-7000-8e76-3d5440fe7bde",
  type: "page-type/seat",
  slug: "mari-world-builder-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-played/harem-hotel",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
