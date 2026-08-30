import type { Module } from "../../code-system/module/module.page-type.ts"

export const putting = {
  id: "01a04efb-4361-7984-87ce-b338a39e98b3",
  pageTypeSlug: "module",
  slug: "putting",
  definition: "a file put where a test wants it in a tree it stood up, and whether one is there",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folders a path names are made on the way.",
    },
    {
      invariantKind: "departure",
      statement: "A path is said from the root handed in rather than from where the test runs.",
    },
    {
      invariantKind: "departure",
      statement: "Where the file landed is handed back.",
    },
  ],
} as const satisfies Module
