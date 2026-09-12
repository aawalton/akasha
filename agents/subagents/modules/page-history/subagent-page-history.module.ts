import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const subagentPageHistory = {
  id: "01a072a4-24cb-708c-b671-ae3473e926d0",
  type: "module",
  slug: "subagent-page-history",
  definition:
    "what a subagent's page said before that page went, read out of the commit that wrote it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is read from the newest commit that wrote the page.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that removed the page is left out.",
    },
    {
      invariantKind: "departure",
      statement: "The page asked after is named by its path rather than found among every page.",
    },
    {
      invariantKind: "departure",
      statement: "A path git has no commit writing is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent is answered only where the agent id the body states is the id asked for.",
    },
  ],
} as const satisfies Module
