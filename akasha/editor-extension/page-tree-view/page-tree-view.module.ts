import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTreeView = {
  id: "01a06867-dbcb-7925-ac63-840ba36e4dce",
  pageTypeSlug: "module",
  slug: "page-tree-view",
  definition: "the rows the editor asks for of the page tree and what each row is drawn as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree the editor draws is replaced whole rather than patched row by row.",
    },
    {
      invariantKind: "departure",
      statement: "A filter that reads the same as the one held redraws nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A row is matched against its label and its detail.",
    },
    {
      invariantKind: "departure",
      statement: "A row holding a match is drawn open while a filter stands.",
    },
    {
      invariantKind: "departure",
      statement: "A row is identified apart while a filter stands, so the editor redraws it.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries how many rows stand under it.",
    },
    {
      invariantKind: "departure",
      statement: "A row's tooltip leaves out whatever that row does not carry.",
    },
    {
      invariantKind: "departure",
      statement: "A row standing for no page opens no document rather than opening the wrong one.",
    },
    {
      invariantKind: "departure",
      statement: "How many rows matched is answered as none where no filter stands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the harness.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the view these rows are drawn in.",
    },
  ],
} as const satisfies Module
