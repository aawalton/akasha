import type { MemoryKind } from "akasha/infrastructure/memory/kinds/memory-kind.page-type.types.ts"

export const virtual = {
  id: "01a09131-7243-719c-8edc-d76d9fb9b86b",
  type: "memory-kind",
  slug: "virtual",
  definition: "memory a process has asked for rather than memory that process holds",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Memory a process asked for and never reached costs that process no RAM.",
    },
    {
      invariantKind: "departure",
      statement: "A process's virtual memory bounds nothing about what that process holds.",
    },
    {
      invariantKind: "departure",
      statement: "A runtime reserving its whole heap at once is virtual until reached.",
    },
    {
      invariantKind: "departure",
      statement: "The address space limit an rlimit states is read in virtual memory.",
    },
  ],
} as const satisfies MemoryKind
