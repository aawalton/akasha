import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterTheDatingGame = {
  id: "01a0de89-7a17-7000-9a86-02d16f4ad5d2",
  type: "page-type/seat",
  slug: "mari-game-master-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-game/the-dating-game",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "607f8593-dc90-49ed-9a93-3c1a116a84a0",
} as const satisfies Seat
