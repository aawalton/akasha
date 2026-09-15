import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commandTreeView = {
  id: "01a07c94-33b9-7ddc-97b7-5878bb0f8a07",
  type: "module",
  slug: "command-tree-view",
  definition: "the rows the editor asks for of the command tree and what each row is drawn as",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A filter that reads the same as the filter held redraws nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is matched against its label and its detail.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is identified apart while a filter is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row carries how many rows are under it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row's tooltip leaves out whatever that row does not have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row representing a command is labelled by the whole call that command is made by.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A row draws no definition beside its label.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row representing no page opens no document rather than opening the wrong document.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row opens the whole path that row has rather than a path composed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many rows matched is answered as no number where no filter is there.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the harness.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here makes the view these rows are drawn in.",
    },
  ],
} as const satisfies Module
