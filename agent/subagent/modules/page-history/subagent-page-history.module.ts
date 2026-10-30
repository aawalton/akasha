import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentPageHistory = {
  id: "01a072a4-24cb-708c-b671-ae3473e926d0",
  type: "page-type/module",
  slug: "subagent-page-history",
  definition: "how code reads a subagent page from the last commit with the page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is read from the newest commit that wrote the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit that removed the page is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page asked after is named by its path rather than found among every page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path git has no commit writing is answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that will not load is answered as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A subagent is answered only where the agent id the body states is the id asked for.",
    },
  ],
  createdAt: "2026-09-05T17:35:55.083Z",
  updatedAt: "2026-10-30T14:45:43.547Z",
} as const satisfies Module
