import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTrailingCall = {
  id: "01a12624-da53-7119-a53e-638c665187c6",
  type: "page-type/module",
  slug: "inventory-trailing-call",
  definition: "a call that runs once, a delay after the last of a burst of calls",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call made while a run waits moves that run a whole delay later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The clock is handed in, so the game's timers and a test's timers both drive it.",
    },
  ],
  createdAt: "2026-10-10T14:08:31.826Z",
  updatedAt: "2026-10-10T14:08:31.826Z",
} as const satisfies Module
