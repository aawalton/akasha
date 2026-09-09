import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTreeView = {
  id: "01a06867-dbcb-7925-ac63-840ba36e4dce",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-tree-view",
  definition: "the rows the editor asks for of the page tree and what each row is drawn as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A filter that reads the same as the filter held redraws nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A row is matched against its label and its detail.",
    },

    {
      invariantKind: "departure",
      statement: "A row is identified apart while a filter is there.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries how many rows are under it.",
    },
    {
      invariantKind: "departure",
      statement: "A row's tooltip leaves out whatever that row does not have.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row representing no page opens no document rather than opening the wrong document.",
    },
    {
      invariantKind: "departure",
      statement: "A row opens the whole path that row has rather than a path composed here.",
    },
    {
      invariantKind: "departure",
      statement: "How many rows matched is answered as no number where no filter is there.",
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
