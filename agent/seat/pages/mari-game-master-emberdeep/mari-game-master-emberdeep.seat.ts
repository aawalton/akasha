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
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
