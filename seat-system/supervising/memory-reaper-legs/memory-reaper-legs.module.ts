import type { Module } from "@akasha/code-system/module"

export const memoryReaperLegs = {
  id: "01a0686c-f06b-7001-9b7d-734cdb98ac14",
  pageTypeSlug: "module",
  slug: "memory-reaper-legs",
  definition: "whether one process or one supervisor tree stands over its memory ceiling",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process is over its ceiling on resident memory rather than on shared memory.",
    },
    {
      invariantKind: "departure",
      statement: "A tree is weighed on the proportional memory its whole subtree holds.",
    },
    {
      invariantKind: "departure",
      statement: "A supervisor standing under another supervisor is no tree root of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Memory a per-process kill already reclaims is left out of its tree's total.",
    },
    {
      invariantKind: "departure",
      statement: "A leg says why it decided as it did whether or not it decided to kill.",
    },
  ],
} as const satisfies Module
