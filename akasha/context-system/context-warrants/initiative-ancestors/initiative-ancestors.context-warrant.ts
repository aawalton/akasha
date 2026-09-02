import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const initiativeAncestors = {
  id: "01a058d6-2843-7000-81b8-b20476cc7fef",
  pageTypeSlug: "context-warrant",
  slug: "initiative-ancestors",
  definition: "what a seat must read for the initiatives above the one it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants every initiative the one it states stands under.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative above another is the one that other names as its parent.",
    },
    {
      invariantKind: "departure",
      statement: "The initiative the seat states is no ancestor of itself.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no initiative warrants no initiative.",
    },
  ],
} as const satisfies ContextWarrant
