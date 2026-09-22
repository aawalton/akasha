import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clearTarget = {
  id: "01a06071-0c78-7d17-86de-fe565133b1ee",
  type: "page-type/module",
  slug: "clear-target",
  definition:
    "reading what was asked to be cleared into all, a domain, an unknown name, or nothing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The word `all` asks for every domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty request asks for nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request naming no known domain comes back as unknown.",
    },
  ],
} as const satisfies Module
