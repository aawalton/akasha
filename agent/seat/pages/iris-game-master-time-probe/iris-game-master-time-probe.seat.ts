import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterTimeProbe = {
  id: "01a18031-46fe-7119-a6b5-7ee07edd1fab",
  type: "page-type/seat",
  slug: "iris-game-master-time-probe",
  persona: "persona/iris",
  assignmentSlug: "story-played/time-probe",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-28T01:47:55.910Z",
  updatedAt: "2026-10-28T01:47:55.910Z",
} as const satisfies Seat
