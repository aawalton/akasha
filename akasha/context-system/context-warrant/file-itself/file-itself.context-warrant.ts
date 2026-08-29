import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const fileItself = {
  id: "01a04f58-a7f0-7000-9d3a-6a0f2c4b81d7",
  pageTypeSlug: "context-warrant",
  slug: "file-itself",
  definition: "what a seat must read for the file it changes",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file warrants itself: the body standing at a path is that path's reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file not yet standing warrants nothing of itself, there being no body to have read; whatever else warrants it stands unchanged.",
    },
    {
      invariantKind: "departure",
      statement:
        "The body warranted is the body standing on disk, which is the body a read records.",
    },
  ],
} as const satisfies ContextWarrant
