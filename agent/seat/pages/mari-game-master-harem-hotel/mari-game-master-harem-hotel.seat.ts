import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterHaremHotel = {
  id: "01a0e839-4826-7000-a30e-437bfd85bcb3",
  type: "page-type/seat",
  slug: "mari-game-master-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-played/harem-hotel",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
