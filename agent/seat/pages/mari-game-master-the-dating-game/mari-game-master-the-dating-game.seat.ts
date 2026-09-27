import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterTheDatingGame = {
  id: "01a0e051-bbfc-7000-8ada-fb961ce43823",
  type: "page-type/seat",
  slug: "mari-game-master-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
