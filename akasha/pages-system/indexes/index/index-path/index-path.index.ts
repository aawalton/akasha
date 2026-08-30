import type { Index } from "../index.page-type.ts"

export const indexPath = {
  id: "01a04ede-d0fc-7000-bfe5-c9f320b833c7",
  pageTypeSlug: "index",
  slug: "index-path",
  definition: "an index from a path to the page whose file it is",
  indexName: "path",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path file is found by the path alone, with no scope or property above it.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the page's path and its id.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file a page property holds is filed under its own path, and answers the page stating it.",
    },
    {
      invariantKind: "departure",
      statement: "A path cannot collide, one path holding one file and one file being one page.",
    },
    {
      invariantKind: "departure",
      statement: "A page is filed here only when it carries an id, a slug and a page type.",
    },
    {
      invariantKind: "departure",
      statement: "Every path the index files is found by walking this tree, and it is the corpus.",
    },
  ],
} as const satisfies Index
