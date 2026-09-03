import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const library = {
  id: "01a06574-0291-7000-bfeb-0932b2156cac",
  pageTypeSlug: "domain",
  slug: "library",
  definition: "what Alan works through, and how far through it he has got",
  partSlugs: [
    "domain/studying",
    "domain/watching",
    "workspace-package/reading",
    "workspace-package/book-of-everything",
    "workspace-package/book-of-everything-commands",
    "domain/book-of-everything",
    "domain/learn-everything",
    "domain/litrpg-books",
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
      statement: "What holds what is the one edge every part of this domain is read along.",
    },
  ],
} as const satisfies Domain
