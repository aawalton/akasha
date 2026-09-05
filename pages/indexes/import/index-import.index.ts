import type { Index } from "../index/index.page-type.ts"

export const indexImport = {
  id: "01a04d9a-0e1a-7000-b8d9-d68b0a8a831c",
  pageTypeSlug: "index",
  slug: "index-import",
  definition: "an index from a file to the files importing it",
  name: "import",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An import file is named for the path imported.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the path of the file importing the path imported.",
    },
    {
      invariantKind: "departure",
      statement: "Only a body named `.ts` or `.tsx` makes an edge.",
    },
    {
      invariantKind: "departure",
      statement: "A relative specifier makes an edge.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier naming a package makes an edge at the file the naming handed in resolves to.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier the naming handed in does not resolve makes no edge.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier landing outside the repository makes none either.",
    },
    {
      invariantKind: "departure",
      statement:
        "What edges a body makes is answered here rather than worked out again by a caller.",
    },
    {
      invariantKind: "departure",
      statement: "A type-only import makes the same edge as any other.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is filed for what the body says whether or not the file it names stands.",
    },
  ],
} as const satisfies Index
