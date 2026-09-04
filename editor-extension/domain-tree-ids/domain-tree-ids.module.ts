import type { Module } from "../../code-system/modules/module.page-type.ts"

export const domainTreeIds = {
  id: "01a064c8-9a9c-76e0-a025-5d952e3be0ea",
  pageTypeSlug: "module",
  slug: "domain-tree-ids",
  definition:
    "the strings the editor knows the domain tree's container, view and refresh command by",
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
      statement: "The container holding the domain tree carries a name apart from the tree's name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the view or the command these names reach.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a row of the domain tree.",
    },
  ],
} as const satisfies Module
