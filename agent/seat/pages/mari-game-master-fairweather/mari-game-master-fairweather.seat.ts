import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterFairweather = {
  id: "01a11358-ccae-7000-9538-7eef24b66c9f",
  type: "page-type/seat",
  slug: "mari-game-master-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "8cea77f2-da72-4dc8-be98-4c349fc6f1b2",
} as const satisfies Seat
