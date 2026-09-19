import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const findingTreeView = {
  id: "01a0b733-1336-7683-a2fc-d9cc3ba735f1",
  type: "page-type/module",
  slug: "finding-tree-view",
  definition: "the rows the editor asks for of the finding tree and what each row is drawn as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter that reads the same as the filter held redraws nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is matched against its label alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is identified apart while a filter is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carries how many findings are beneath it rather than how many rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row with no finding beneath it carries no count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row opens the whole path that row has rather than a path composed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row naming no document opens nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip says a row's path against the checkout rather than whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many rows matched is answered as no number where no filter is there.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the harness.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the view these rows are drawn in.",
    },
  ],
} as const satisfies Module
