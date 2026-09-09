import type { Module } from "../../code-system/modules/module.page-type.ts"

export const commandTreeView = {
  id: "01a07c94-33b9-7ddc-97b7-5878bb0f8a07",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-tree-view",
  definition: "the rows the editor asks for of the command tree and what each row is drawn as",
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
      statement: "A row is labelled by the whole call that row is made by.",
    },
    {
      invariantKind: "absence",
      statement: "A row draws no definition beside its label.",
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
