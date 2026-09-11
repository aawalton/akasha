import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const memory = {
  id: "01a09115-c783-7db5-b3bb-5b8349b6b51d",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "memory",
  definition: "where bytes live while a program holds them",
  parts: ["domain/memory-kind", "domain/memory-limit", "domain/swap", "domain/memory-reaping"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The memory a host has is one pool every program on that host draws from.",
    },
    {
      invariantKind: "departure",
      statement: "Memory one program holds is memory no other program can have.",
    },
    {
      invariantKind: "constraint",
      statement: "A program is given the memory it asks for before anything weighs the ask.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of memory names the kind that reading is in.",
    },
    {
      invariantKind: "departure",
      statement: "A host out of memory ends a program rather than refusing the ask.",
    },
  ],
} as const satisfies Domain
