import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTreeReading = {
  id: "01a06867-dbcb-7300-9560-2f216f804af7",
  pageTypeSlug: "module",
  slug: "page-tree-reading",
  definition: "how many rows a page tree holds and which document each of its rows opens",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "How many rows the tree holds is counted apart from how many open a document.",
    },
    {
      invariantKind: "departure",
      statement: "A row names its document by a whole path, so nothing is joined to open one.",
    },
    {
      invariantKind: "departure",
      statement: "A row representing no page opens no document.",
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
