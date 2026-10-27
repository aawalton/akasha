import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderBeatFlowTest = {
  id: "01a17f87-0539-72c1-892c-ffa79dbbf709",
  type: "page-type/seat",
  slug: "iris-world-builder-beat-flow-test",
  persona: "persona/iris",
  assignmentSlug: "story-played/beat-flow-test",
  role: "role/world-builder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "fb9f664a-c160-4073-8108-becba94ca25f",
  createdAt: "2026-10-27T22:41:57.921Z",
  updatedAt: "2026-10-27T22:42:01.331Z",
} as const satisfies Seat
