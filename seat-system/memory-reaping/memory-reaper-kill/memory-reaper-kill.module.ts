import type { Module } from "@akasha/code/module"

export const memoryReaperKill = {
  id: "01a0686c-f06b-7006-9d1b-e53dd0c8cb4a",
  pageTypeSlug: "module",
  type: "module",
  slug: "memory-reaper-kill",
  definition: "a process or a whole tree asked to end and then made to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process is asked to end before that process is made to.",
    },
    {
      invariantKind: "departure",
      statement: "A process still alive at the timeout is made to end.",
    },
    {
      invariantKind: "departure",
      statement: "A process already gone is no failure.",
    },
    {
      invariantKind: "departure",
      statement:
        "A whole tree is asked together and waited on together rather than a process at a time.",
    },
  ],
} as const satisfies Module
