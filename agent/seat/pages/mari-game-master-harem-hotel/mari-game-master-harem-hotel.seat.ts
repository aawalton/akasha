import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterHaremHotel = {
  id: "01a0e98b-a156-7000-b3ef-4900f445183a",
  type: "page-type/seat",
  slug: "mari-game-master-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-written/harem-hotel",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
