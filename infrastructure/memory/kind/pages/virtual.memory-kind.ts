import type { MemoryKind } from "akasha/infrastructure/memory/kind/memory-kind.page-type.types.ts"

export const virtual = {
  id: "01a09131-7243-719c-8edc-d76d9fb9b86b",
  type: "page-type/memory-kind",
  slug: "virtual",
  definition: "memory a process has asked for rather than memory that process holds",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Memory a process asked for and never reached costs that process no RAM.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process's virtual memory bounds nothing about what that process holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A runtime reserving its whole heap at once is virtual until reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The address space limit an rlimit states is read in virtual memory.",
    },
  ],
  createdAt: "2026-09-11T15:58:51.971Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies MemoryKind
