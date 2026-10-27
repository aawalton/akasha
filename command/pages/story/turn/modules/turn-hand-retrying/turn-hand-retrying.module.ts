import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnHandRetrying = {
  id: "01a17fcc-e6fb-7c99-8872-b73982554534",
  type: "page-type/module",
  slug: "turn-hand-retrying",
  definition: "a beat's hand-out tried again until its story's seats can be reached",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hand-out reading its story's game master seat reads it again until it is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that would not start for its beat is started again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each is tried six times, ten seconds apart, before the hand-out is a fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "So a story's seats unset for a moment never leave a ready beat unhanded.",
    },
  ],
  createdAt: "2026-10-27T23:58:17.338Z",
  updatedAt: "2026-10-27T23:58:17.338Z",
} as const satisfies Module
