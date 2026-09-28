import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterHaremHotel = {
  id: "01a0e85f-5507-7000-8cfa-1cc47de93634",
  type: "page-type/seat",
  slug: "mari-game-master-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-played/harem-hotel",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
