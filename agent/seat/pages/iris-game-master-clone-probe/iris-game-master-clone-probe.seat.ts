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
  claudeCodeSessionUuid: "0411ff5a-0fb9-4d1f-98ce-0cda9ac34396",
  createdAt: "2026-10-27T21:54:26.084Z",
  updatedAt: "2026-10-27T21:54:29.673Z",
} as const satisfies Seat
