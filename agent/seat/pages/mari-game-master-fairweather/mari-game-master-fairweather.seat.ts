import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterFairweather = {
  id: "01a112ab-bb10-7000-baa3-22ee5a4ffc1a",
  type: "page-type/seat",
  slug: "mari-game-master-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "d743a598-6f76-483a-9223-59dabfa23e0f",
} as const satisfies Seat
