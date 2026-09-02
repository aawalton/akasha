import type { Index } from "../index.page-type.ts"

export const indexPath = {
  id: "01a04ede-d0fc-7000-bfe5-c9f320b833c7",
  pageTypeSlug: "index",
  slug: "index-path",
  definition: "an index from a path to the page whose file it is",
  name: "path",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path file is found by the path alone.",
    },
    {
      invariantKind: "departure",
      statement: "A path file has no scope or property above that path file.",
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
      statement: "A file a page property holds answers the page stating that file.",
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
      statement: "A page is filed here only when the page carries an id.",
    },
    {
      invariantKind: "departure",
      statement: "A page is filed here only when the page carries a slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page is filed here only when the page carries a page type.",
    },
    {
      invariantKind: "departure",
      statement: "Every path a page states is found by walking this path tree.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sops file is filed here whether or not that file is there.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sops file is filed here only where the page's type declares a secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's uncommitted file is filed here only where the page's type declares an uncommitted value.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a numbered file is there is read from the change laid over the disk.",
    },
    {
      invariantKind: "departure",
      statement: "This tree is every page there is.",
    },
  ],
} as const satisfies Index
