import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const refusalTreeView = {
  id: "01a0d94c-a29e-7fd0-8b93-0a59fa607764",
  type: "page-type/module",
  slug: "refusal-tree-view",
  definition: "the rows the editor asks for of the refusal tree and what each row is drawn as",
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
      statement: "A row carries how many refusals are beneath it rather than how many rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row with no refusal beneath it carries no count.",
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
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the harness.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the view these rows are drawn in.",
    },
  ],
} as const satisfies Module
