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
  claudeCodeSessionUuid: "8ef46a71-d570-4614-97c3-cd2f5f1d1356",
} as const satisfies Seat
