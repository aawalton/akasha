import type { Index } from "../index.page-type.types.ts"

export const indexDeclaring = {
  id: "01a0820f-87fc-7587-bb42-6dccc5070a5e",
  pageTypeSlug: "index",
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
      statement: "A shape is filed here where the schema index files that shape.",
    },
    {
      invariantKind: "departure",
      statement:
        "The shapes filed here are read off what the schema index files rather than worked out again.",
    },
    {
      invariantKind: "departure",
      statement:
        "What every property declares is one file read rather than a walk of the schema tree.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is always `page-property`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing filed here says where the schema index files a shape.",
    },
  ],
} as const satisfies Index
