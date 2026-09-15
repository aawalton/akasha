import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const initiativeAncestors = {
  id: "01a058d6-2843-7000-81b8-b20476cc7fef",
  type: "page-type/context-warrant",
  slug: "initiative-ancestors",
  definition: "what a seat must read for the initiatives above the one it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat warrants every initiative the one that seat states is under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An initiative is above the initiative naming that initiative as its parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The initiative the seat states is no ancestor of itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating no initiative warrants no initiative.",
    },
  ],
} as const satisfies ContextWarrant
