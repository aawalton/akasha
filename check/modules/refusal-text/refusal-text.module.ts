import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const refusalText = {
  id: "01a06895-1cfe-7000-918a-9e999d062e47",
  type: "page-type/module",
  slug: "refusal-text",
  definition: "a refusal's words, read from its page and filled at every hole",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hole the body marks and no value fills refuses rather than printing the brace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value handed over that the body marks no hole for refuses.",
    },
  ],
  createdAt: "2026-09-03T18:43:17.886Z",
  updatedAt: "2026-09-15T18:21:01.000Z",
} as const satisfies Module
