import type { Index } from "../index.page-type.ts"

export const indexImport = {
  id: "01a04d9a-0e1a-7000-b8d9-d68b0a8a831c",
  pageTypeSlug: "index",
  slug: "index-import",
  definition: "an index from a file to the files importing it",
  indexName: "import",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An import file is named for the path imported.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the path of the file importing it.",
    },
    {
      invariantKind: "departure",
      statement: "A relative specifier makes an edge and a package specifier makes none.",
    },
    {
      invariantKind: "departure",
      statement: "A type-only import makes the same edge as any other.",
    },
    {
      invariantKind: "departure",
      statement:
        "An edge is filed for what the body says, whether or not the file it names stands.",
    },
  ],
} as const satisfies Index
