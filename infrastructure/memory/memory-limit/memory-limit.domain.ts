import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const memoryLimit = {
  id: "01a09115-8c65-76a6-bdc1-cfddcc4acd88",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "memory-limit",
  definition: "the most memory one thing may take, and what happens when it asks for more",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A limit refuses, throttles or ends the thing limited, and says which.",
    },
    {
      invariantKind: "departure",
      statement: "A limit nothing enforces is no limit.",
    },
    {
      invariantKind: "departure",
      statement: "A limit is stated where the thing limited is started.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling above what the host has bounds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A limit is read against every other limit the same host holds.",
    },
    {
      invariantKind: "departure",
      statement: "The limit a program takes is the lowest of the limits reaching that program.",
    },
    {
      invariantKind: "gap",
      statement: "Every limit a host holds is stated in one place.",
    },
  ],
} as const satisfies Domain
