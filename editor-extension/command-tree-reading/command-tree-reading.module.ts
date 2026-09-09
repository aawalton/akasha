import type { Module } from "../../code-system/modules/module.page-type.ts"

export const commandTreeReading = {
  id: "01a07c93-8051-7e6d-aef6-f3c7665bbb9f",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-tree-reading",
  definition: "how many rows a command tree holds and how many of them are commands",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "How many rows the tree has is counted apart from how many are commands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks a command anything.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here assembles a tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
