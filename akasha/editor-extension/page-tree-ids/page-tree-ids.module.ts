import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTreeIds = {
  id: "01a064c8-9a9c-7e5f-b6da-e2f88bc5c4c9",
  pageTypeSlug: "module",
  slug: "page-tree-ids",
  definition: "the strings the editor knows the page tree's container, view and refresh command by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The names here are the names the extension manifest carries.",
    },
    {
      invariantKind: "departure",
      statement: "The refresh command's name opens with the view's name.",
    },
    {
      invariantKind: "departure",
      statement: "The container holding the page tree carries a name apart from the tree's name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the view or the command these names reach.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a row of the page tree.",
    },
  ],
} as const satisfies Module
