import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterCloneProbe = {
  id: "01a17f5b-7fc8-7087-8717-b4532e241eaa",
  type: "page-type/seat",
  slug: "iris-game-master-clone-probe",
  persona: "persona/iris",
  assignmentSlug: "story-played/clone-probe",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T21:54:26.084Z",
  updatedAt: "2026-10-27T21:54:26.084Z",
} as const satisfies Seat
