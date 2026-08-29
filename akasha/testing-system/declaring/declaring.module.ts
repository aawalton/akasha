import type { Module } from "../../code-system/module/module.page-type.ts"

export const declaring = {
  id: "01a04f4e-cc2d-7607-9fbc-82d1c0c0d9be",
  pageTypeSlug: "module",
  slug: "declaring",
  definition: "the property pages a test's world must carry before an identity can be filed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages are the corpus's own, imported rather than restated, so a test's world declares what the repository declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A world is served either by carrying the pages into its tree or by filing what they declare, because a rebuild reads the tree and a settle reads the index.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "What is filed is worked out by the indexer's own code, so this proves nothing about the shape it files under.",
    },
  ],
} as const satisfies Module
