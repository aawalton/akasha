import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariGameMasterEncounters = {
  id: "01a1303d-c9d7-7000-9c52-95b8219e47a4",
  type: "page-type/seat",
  slug: "mari-game-master-encounters",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "f6bd33d3-3e65-4513-b981-e6b1b7178728",
  createdAt: "2026-10-12T13:11:59.120Z",
  updatedAt: "2026-10-12T13:12:02.147Z",
} as const satisfies Seat
