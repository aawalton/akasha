import type { Module } from "../../code-system/modules/module.page-type.ts"

export const domainTreeView = {
  id: "01a06867-dbcb-7f8b-95a7-e07e36cdffee",
  pageTypeSlug: "module",
  slug: "domain-tree-view",
  definition: "the rows the editor asks for of the domain tree and what each row is drawn as",
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
      statement: "A row is matched against its slug and its persona.",
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
      statement: "A row a sequence placed carries that place ahead of its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries how many rows stand under it.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose descent reaches no persona says so rather than being drawn empty.",
    },
    {
      invariantKind: "departure",
      statement: "A row opens the document that row's path names.",
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
