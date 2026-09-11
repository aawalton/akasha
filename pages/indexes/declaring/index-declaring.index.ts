import type { Index } from "akasha/pages/indexes/index.page-type.types.ts"

export const indexDeclaring = {
  id: "01a0820f-87fc-7587-bb42-6dccc5070a5e",
  type: "index",
  slug: "index-declaring",
  definition: "an index from the repository to every property shape its pages declare",
  name: "declaring",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One file has every property shape the pages declare.",
    },
    {
      invariantKind: "departure",
      statement: "A line has one property shape and nothing more.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating a property slug is a page property whatever page type that page is.",
    },
    {
      invariantKind: "departure",
      statement: "A value the property does not have is held as null rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A qualified name is held as its slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is read from the property's own page alone.",
    },
    {
      invariantKind: "departure",
      statement: "No other page's change can leave an entry stale.",
    },
    {
      invariantKind: "departure",
      statement: "What every property declares is one file read rather than a tree of files.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is always `page-property`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing filed here says where a shape's own page sits.",
    },
  ],
} as const satisfies Index
