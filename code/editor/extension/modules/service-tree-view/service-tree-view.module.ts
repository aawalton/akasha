import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceTreeView = {
  id: "01a09c1e-87d4-7555-af5b-31f08996ea13",
  type: "module",
  slug: "service-tree-view",
  definition: "the rows the editor asks for of the service tree and the color each row is drawn in",
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
      statement: "A row whose children carry colors counts those children by color after that.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A row whose children carry no color takes no count by color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row with a color sits under a scheme of this panel's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color is drawn by a decoration answering that scheme rather than on the row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A decoration answers nothing for a name under any other scheme.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every row has a blank icon.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row carries the kind that row is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row opens the whole path that row has rather than a path composed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tooltip says a row's path against the checkout rather than whole.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the harness.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here names a color.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks a service anything.",
    },
  ],
} as const satisfies Module
