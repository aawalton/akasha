import type { MemoryKind } from "akasha/infrastructure/memory/kind/memory-kind.page-type.types.ts"

export const proportional = {
  id: "01a09131-a5b6-78ec-bd9d-0d9d68faeb4b",
  type: "page-type/memory-kind",
  slug: "proportional",
  definition: "a shared page divided among the processes holding that page",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Proportional memory over every process on a host adds to what that host holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The proportional memory of a process holding nothing shared is its resident memory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process's proportional memory rises when a process sharing with it ends.",
    },
  ],
} as const satisfies MemoryKind
