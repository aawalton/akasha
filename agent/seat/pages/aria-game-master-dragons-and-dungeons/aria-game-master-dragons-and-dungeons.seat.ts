import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ariaGameMasterDragonsAndDungeons = {
  id: "01a0e3a2-8846-7000-95bd-31a729cd23a1",
  type: "page-type/seat",
  slug: "aria-game-master-dragons-and-dungeons",
  persona: "persona/aria",
  assignmentSlug: "story-played/dragons-and-dungeons",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
