import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const memory = {
  id: "01a09115-c783-7db5-b3bb-5b8349b6b51d",
  type: "page-type/domain",
  slug: "memory",
  definition: "where bytes live while a program holds them",
  parts: ["domain/memory-limit", "page-type/memory-kind"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The memory a host has is one pool every program on that host draws from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Memory one program holds is memory no other program can have.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A program is given the memory it asks for before anything weighs the ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host out of memory ends a program rather than refusing the ask.",
    },
  ],
} as const satisfies Domain
