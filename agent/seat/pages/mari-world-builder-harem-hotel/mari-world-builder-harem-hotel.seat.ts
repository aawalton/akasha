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
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "85f12757-5408-4eb9-837f-6b39f828abcb",
} as const satisfies Seat
