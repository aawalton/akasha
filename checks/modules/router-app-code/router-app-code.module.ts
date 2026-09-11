import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const routerAppCode = {
  id: "01a08e07-d3c0-7687-a361-081c6e367ee5",
  pageTypeSlug: "module",
  type: "module",
  slug: "router-app-code",
  definition: "how a check reads the code a router app's package holds",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A router app's package is the folder that app's page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The folders the router apps sit in are worked out once and held for one index.",
    },
    {
      invariantKind: "departure",
      statement: "Which modules a file names is read from the strings that file spells.",
    },
    {
      invariantKind: "departure",
      statement: "A server-only module's name closes with `.server` before its extension.",
    },
    {
      invariantKind: "departure",
      statement: "A module under a `.server` folder is server-only too.",
    },
  ],
} as const satisfies Module
