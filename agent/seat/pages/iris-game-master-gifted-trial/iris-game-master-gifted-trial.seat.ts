import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterGiftedTrial = {
  id: "01a18d27-32e7-7201-ab50-8c542dcf26e4",
  type: "page-type/seat",
  slug: "iris-game-master-gifted-trial",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-trial",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "4c3a2c5e-f4af-4001-9a3e-ccd8d9dfa4cf",
  createdAt: "2026-10-30T14:11:59.402Z",
  updatedAt: "2026-10-30T14:12:02.890Z",
} as const satisfies Seat
