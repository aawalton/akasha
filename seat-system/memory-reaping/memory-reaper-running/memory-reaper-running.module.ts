import type { Module } from "@akasha/code/module"

export const memoryReaperRunning = {
  id: "01a0686a-7a57-73d2-a05d-06bd52f76154",
  pageTypeSlug: "module",
  slug: "memory-reaper-running",
  definition: "the reaper's loop, ticking until it is stopped",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reaper's configuration is stated when that reaper starts.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that throws is reported and the loop goes on.",
    },
    {
      invariantKind: "departure",
      statement: "The reaper runs until stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A stop ends the loop at its next boundary.",
    },
  ],
} as const satisfies Module
