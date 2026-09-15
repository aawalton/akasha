import type { MemoryKind } from "akasha/infrastructure/memory/kind/memory-kind.page-type.types.ts"

export const available = {
  id: "01a09131-bee0-7f6e-ba6c-4fc1a8e6466b",
  type: "memory-kind",
  slug: "available",
  definition: "memory a program could take without anything being swapped",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Memory that is free is a part of memory that is available.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Cached memory the kernel would give up counts as available.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A host with little free memory and much available has nothing wrong with it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a host can admit more work is asked in available memory.",
    },
  ],
} as const satisfies MemoryKind
