import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderUndoCheck = {
  id: "01a1830c-b24b-7080-a39c-2624f2234459",
  type: "page-type/seat",
  slug: "iris-world-builder-undo-check",
  persona: "persona/iris",
  assignmentSlug: "story-played/undo-check",
  role: "role/world-builder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "33cbbaab-6eb1-40af-9be1-2c880a2df5f0",
  createdAt: "2026-10-28T15:06:50.233Z",
  updatedAt: "2026-10-28T15:06:54.883Z",
} as const satisfies Seat
