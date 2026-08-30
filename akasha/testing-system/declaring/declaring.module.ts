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
      statement: "The pages are the corpus's own imported rather than restated.",
    },
    {
      invariantKind: "departure",
      statement:
        "A world is served by carrying the pages into its tree. Every entry an index holds is one a rebuild or a settle worked out from a page that stands.",
    },
    {
      invariantKind: "departure",
      statement: "A generator kind a property carried here names is carried too.",
    },
    {
      invariantKind: "departure",
      statement: "A property naming a kind that stands nowhere is refused rather than guessed at.",
    },
  ],
} as const satisfies Module
