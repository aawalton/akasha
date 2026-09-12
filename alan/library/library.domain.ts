import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const library = {
  id: "01a06574-0291-7000-bfeb-0932b2156cac",
  type: "domain",
  slug: "library",
  definition: "what Alan works through, and how far through it he has got",
  parts: [
    "domain/book-of-everything",
    "domain/learn-everything",
    "domain/litrpg-books",
    "domain/reading",
    "domain/studying",
    "domain/watching",
    "page-type/litrpg-collection",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Everything kept here is a collection.",
    },
    {
      invariantKind: "departure",
      statement: "A work is one collection.",
    },
    {
      invariantKind: "departure",
      statement: "An instalment of a work is one collection.",
    },
    {
      invariantKind: "departure",
      statement: "A shelf of works is one collection.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which collection has which collection is the one edge every part of this domain is read along.",
    },
  ],
} as const satisfies Domain
