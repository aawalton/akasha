import type { MemoryKind } from "akasha/infrastructure/memory/kinds/memory-kind.page-type.types.ts"

export const shared = {
  id: "01a09131-8c78-705b-99a3-05d0c905efa6",
  type: "memory-kind",
  slug: "shared",
  definition: "memory more than one process holds at once",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page more than one process holds is held once by the host.",
    },
    {
      invariantKind: "departure",
      statement: "Shared memory is why the processes of a host add to more than that host has.",
    },
    {
      invariantKind: "departure",
      statement: "A library every process loads is shared rather than held by each.",
    },
    {
      invariantKind: "departure",
      statement: "Ending one process holding a shared page frees none of that page.",
    },
  ],
} as const satisfies MemoryKind
