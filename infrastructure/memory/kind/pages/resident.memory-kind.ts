import type { MemoryKind } from "akasha/infrastructure/memory/kind/memory-kind.page-type.types.ts"

export const resident = {
  id: "01a09131-5456-7397-ad61-ca86675666db",
  type: "page-type/memory-kind",
  slug: "resident",
  definition: "memory a process holds in RAM at the moment it is read",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two processes sharing a page are each resident in the whole page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Adding the resident memory of two processes counts a page they share twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Memory a process has swapped out is resident nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What one process is holding is asked in resident memory.",
    },
  ],
  createdAt: "2026-09-11T15:58:44.310Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies MemoryKind
