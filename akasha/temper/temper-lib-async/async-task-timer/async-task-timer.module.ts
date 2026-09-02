import type { Module } from "@akasha/code-system/module"

export const asyncTaskTimer = {
  id: "01a0606a-1c59-7cbd-b45b-61c3cf20d13d",
  pageTypeSlug: "module",
  slug: "async-task-timer",
  definition: "the delays and the waits that hold a task back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A delay shorter than the minimum runs at once rather than waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A delayed task is suspended until the game update fires.",
    },
    {
      invariantKind: "departure",
      statement: "A wait re-runs the same step each frame until the condition answers true.",
    },
    {
      invariantKind: "departure",
      statement: "A time here is read from the game update rather than from a wall clock.",
    },
  ],
} as const satisfies Module
