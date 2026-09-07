import type { Module } from "@akasha/code/module"

export const nameOrdering = {
  id: "01a07c93-d1ce-7d75-844c-a9a61f0601d8",
  pageTypeSlug: "module",
  slug: "name-ordering",
  definition: "names held in the order a locale sorts names by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Names are ordered by the locale's own comparison rather than by code point.",
    },
    {
      invariantKind: "departure",
      statement: "The list of names handed in is left as that list was handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here drops a name said twice.",
    },
  ],
} as const satisfies Module
