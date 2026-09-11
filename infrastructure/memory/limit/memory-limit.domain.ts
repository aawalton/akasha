import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const memoryLimit = {
  id: "01a09115-8c65-76a6-bdc1-cfddcc4acd88",
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
      invariantKind: "departure",
      statement: "A limit has a level that throttles and a level that ends.",
    },
    {
      invariantKind: "departure",
      statement: "The level that throttles is reached before the level that ends.",
    },
    {
      invariantKind: "departure",
      statement: "A limit reached ends every process under the thing limited at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A runtime's own ceiling is below the limit reaching the program that runtime runs.",
    },
    {
      invariantKind: "departure",
      statement: "A limit states a ceiling for swap as well as for memory.",
    },
    {
      invariantKind: "departure",
      statement: "The memory a host keeps for itself is taken out before anything else is limited.",
    },
    {
      invariantKind: "gap",
      statement: "Every limit is set from a measured peak rather than chosen.",
    },
    {
      invariantKind: "departure",
      statement: "A limit states a share the thing limited always has as well as a ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "The shares one host states add to no more than that host has.",
    },
    {
      invariantKind: "departure",
      statement: "The ceilings one host states add to more than that host has.",
    },
    { invariantKind: "gap", statement: "Every memory limit is the value of a page property." },
  ],
} as const satisfies Domain
