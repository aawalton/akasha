import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterFairweather = {
  id: "01a1128a-fc2c-7000-b874-6e501e88e460",
  type: "page-type/seat",
  slug: "mari-game-master-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "62e953ca-724c-446a-98af-c8f014f185b6",
} as const satisfies Seat
