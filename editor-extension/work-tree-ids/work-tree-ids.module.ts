import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeIds = {
  id: "01a064c8-9a9c-7f08-a940-edc2c37c2024",
  pageTypeSlug: "module",
  slug: "work-tree-ids",
  definition: "the strings the editor knows the work tree's container, view and refresh command by",
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
      statement: "The container holding the work tree carries a name apart from the tree's name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the view or the command these names reach.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a row of the work tree.",
    },
  ],
} as const satisfies Module
