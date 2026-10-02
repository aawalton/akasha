import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterEmberdeep = {
  id: "01a0fdb3-6ffc-7000-a463-a27ef46aadaf",
  type: "page-type/seat",
  slug: "mari-game-master-emberdeep",
  persona: "persona/mari",
  assignmentSlug: "story-written/emberdeep",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "8ae65326-c1f2-49d4-b9d9-12ad68d3076e",
} as const satisfies Seat
