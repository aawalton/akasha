import type { Domain } from "../../domains/domain.page-type.ts"

export const library = {
  id: "01a06574-0291-7000-bfeb-0932b2156cac",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "library",
  definition: "what Alan works through, and how far through it he has got",
  parts: [
    "domain/studying",
    "domain/watching",
    "domain/reading",
    "domain/book-of-everything",
    "domain/book-of-everything-commands",
    "domain/learn-everything",
    "domain/litrpg-books",
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
