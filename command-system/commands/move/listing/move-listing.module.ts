import type { Module } from "@akasha/code-system/module"

export const moveListing = {
  id: "01a06d6f-999f-7e4f-b1eb-685dcc7cac12",
  pageTypeSlug: "module",
  slug: "move-listing",
  definition:
    "a page's `partSlugs`, read out of the body and written back with a part joined or gone",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part is added in the place its spelling sorts to.",
    },
    {
      invariantKind: "departure",
      statement: "A part sorting past every part named is added after the last.",
    },
    {
      invariantKind: "departure",
      statement: "A part already named is named once rather than twice.",
    },
    {
      invariantKind: "departure",
      statement: "A part taken out takes its line with it.",
    },
    {
      invariantKind: "departure",
      statement: "A part no list names is answered as nothing rather than as an unchanged list.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming no `partSlugs` is answered as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a part means.",
    },
  ],
} as const satisfies Module
