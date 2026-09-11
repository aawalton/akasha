import type { MemoryKind } from "akasha/infrastructure/memory/kinds/memory-kind.page-type.types.ts"

export const proportional = {
  id: "01a09131-a5b6-78ec-bd9d-0d9d68faeb4b",
  pageTypeSlug: "memory-kind",
  type: "memory-kind",
  slug: "proportional",
  definition: "a shared page divided among the processes holding that page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Proportional memory over every process on a host adds to what that host holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "The proportional memory of a process holding nothing shared is its resident memory.",
    },
    {
      invariantKind: "departure",
      statement: "A tree is weighed in proportional memory rather than in resident memory.",
    },
    {
      invariantKind: "departure",
      statement: "A process's proportional memory rises when a process sharing with it ends.",
    },
  ],
} as const satisfies MemoryKind
