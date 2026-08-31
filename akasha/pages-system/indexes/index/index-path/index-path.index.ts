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
      statement: "A path file is found by the path alone.",
    },
    {
      invariantKind: "departure",
      statement: "A path file has no scope or property above it.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the page's path and its id.",
    },
    {
      invariantKind: "departure",
      statement: "A file a page property holds is filed under its own path.",
    },
    {
      invariantKind: "departure",
      statement: "A file a page property holds answers the page stating it.",
    },
    {
      invariantKind: "departure",
      statement: "One path holds one file.",
    },
    {
      invariantKind: "departure",
      statement: "This index reads rather than refuses.",
    },
    {
      invariantKind: "departure",
      statement: "This index stands apart from identity.",
    },
    {
      invariantKind: "departure",
      statement: "One file is one page.",
    },
    {
      invariantKind: "departure",
      statement: "A page is filed here only when it carries an id and a slug and a page type.",
    },
    {
      invariantKind: "departure",
      statement: "Every path a page states is found by walking this tree.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sops file is filed here whether or not it stands.",
    },
    {
      invariantKind: "departure",
      statement: "This tree is the corpus.",
    },
  ],
} as const satisfies Index
