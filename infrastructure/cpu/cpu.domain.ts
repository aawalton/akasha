import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const cpu = {
  id: "01a09188-434b-7baf-af6f-d0957f02cb86",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "cpu",
  definition: "time on a processor while a program has work to do",
  parts: ["domain/cpu-limit", "page-type/cpu-kind"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The processor time a host has is one pool every program on that host draws from.",
    },
    {
      invariantKind: "departure",
      statement: "Processor time one program takes is time no other program can have.",
    },
    {
      invariantKind: "departure",
      statement: "A program given less processor time runs slower rather than failing.",
    },
    {
      invariantKind: "departure",
      statement: "Processor time nobody takes in a second is gone.",
    },
    {
      invariantKind: "departure",
      statement: "A host short of processor time ends nothing.",
    },
  ],
} as const satisfies Domain
