import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTreeReading = {
  id: "01a06867-dbcb-7300-9560-2f216f804af7",
  type: "module",
  slug: "page-tree-reading",
  definition: "how many rows a page tree holds and how many of them open a document",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many rows the tree has is counted apart from how many open a document.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks a command anything.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here assembles a tree.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
