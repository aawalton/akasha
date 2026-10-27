import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterProbeTwo = {
  id: "01a17fc5-2537-7285-a2f6-975682feb035",
  type: "page-type/seat",
  slug: "iris-game-master-probe-two",
  persona: "persona/iris",
  assignmentSlug: "story-played/probe-two",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "fcea3282-bf16-42ef-9b7d-0372cbb1b1b2",
  createdAt: "2026-10-27T23:49:49.507Z",
  updatedAt: "2026-10-27T23:49:53.113Z",
} as const satisfies Seat
