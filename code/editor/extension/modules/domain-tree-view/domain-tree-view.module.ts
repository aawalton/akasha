import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainTreeView = {
  id: "01a06867-dbcb-7f8b-95a7-e07e36cdffee",
  type: "page-type/module",
  slug: "domain-tree-view",
  definition: "the rows the editor asks for of the domain tree and what each row is drawn as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter that reads the same as the filter held redraws nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is matched against its label and its persona.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A row is identified apart while a filter is there.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A row says nothing of the place a sequence put it in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carries how many rows are under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose descent reaches no persona says so rather than being drawn empty.",
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
