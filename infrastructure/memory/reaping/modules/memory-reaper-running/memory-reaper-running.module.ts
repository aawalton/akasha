import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const memoryReaperRunning = {
  id: "01a0686a-7a57-73d2-a05d-06bd52f76154",
  type: "page-type/module",
  slug: "memory-reaper-running",
  definition: "the reaper's loop, ticking until it is stopped",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reaper's configuration is stated when that reaper starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick that throws is reported and the loop goes on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reaper runs until stopped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop ends the loop at its next boundary.",
    },
  ],
} as const satisfies Module
