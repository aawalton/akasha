import type { MemoryKind } from "akasha/infrastructure/memory/kinds/memory-kind.page-type.types.ts"

export const resident = {
  id: "01a09131-5456-7397-ad61-ca86675666db",
  type: "memory-kind",
  slug: "resident",
  definition: "memory a process holds in RAM at the moment it is read",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two processes sharing a page are each resident in the whole page.",
    },
    {
      invariantKind: "departure",
      statement: "Adding the resident memory of two processes counts a page they share twice.",
    },
    {
      invariantKind: "departure",
      statement: "Memory a process has swapped out is resident nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "What one process is holding is asked in resident memory.",
    },
  ],
} as const satisfies MemoryKind
