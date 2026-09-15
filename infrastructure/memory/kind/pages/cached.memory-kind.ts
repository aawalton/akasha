import type { MemoryKind } from "akasha/infrastructure/memory/kind/memory-kind.page-type.types.ts"

export const cached = {
  id: "01a09131-dd70-72b2-8889-db292bf387cf",
  type: "page-type/memory-kind",
  slug: "cached",
  definition: "memory holding what was read from disk, kept until something else wants it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Cached memory reads as used and is given up on demand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cached memory is given up rather than swapped when a program asks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host whose memory reads as nearly all used is often nearly all cache.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Memory a process holds is never given up this way.",
    },
  ],
} as const satisfies MemoryKind
