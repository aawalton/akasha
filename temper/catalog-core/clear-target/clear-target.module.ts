import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const clearTarget = {
  id: "01a06071-0c78-7d17-86de-fe565133b1ee",
  pageTypeSlug: "module",
  slug: "clear-target",
  definition:
    "reading what was asked to be cleared into all, one domain, an unknown name, or nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The word `all` asks for every domain.",
    },
    {
      invariantKind: "departure",
      statement: "An empty request asks for nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A request naming no known domain comes back as unknown.",
    },
  ],
} as const satisfies Module
