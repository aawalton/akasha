import type { MemoryKind } from "akasha/infrastructure/memory/kind/memory-kind.page-type.types.ts"

export const shared = {
  id: "01a09131-8c78-705b-99a3-05d0c905efa6",
  type: "page-type/memory-kind",
  slug: "shared",
  definition: "memory more than one process holds at once",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page more than one process holds is held once by the host.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Shared memory is why the processes of a host add to more than that host has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A library every process loads is shared rather than held by each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ending one process holding a shared page frees none of that page.",
    },
  ],
  createdAt: "2026-09-11T15:58:58.680Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies MemoryKind
