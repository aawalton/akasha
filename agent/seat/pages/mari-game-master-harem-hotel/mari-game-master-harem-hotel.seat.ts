import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterHaremHotel = {
  id: "01a0eb68-26f7-7000-a382-79a262853290",
  type: "page-type/seat",
  slug: "mari-game-master-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-written/harem-hotel",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "a508ea00-7cca-4fcc-b9b5-50adc00851ac",
} as const satisfies Seat
