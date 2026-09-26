import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterTheDatingGame = {
  id: "01a0deed-abed-7000-a506-a2eaef9fae57",
  type: "page-type/seat",
  slug: "mari-game-master-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "863c3bdd-6d5b-4d3d-babe-368d54199ba9",
} as const satisfies Seat
