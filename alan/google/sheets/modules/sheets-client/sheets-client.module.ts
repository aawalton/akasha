import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetsClient = {
  id: "01a13ab0-c506-786d-95f9-8d51d4e191eb",
  type: "page-type/module",
  slug: "sheets-client",
  definition: "the tabs a sheet holds, and the cells in a range read and written",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is handed in, so nothing here reaches Google under test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cells are read as the sheet shows them rather than as their formulas.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A range holding nothing answers no rows rather than a refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body not shaped as Sheets answers is refused.",
    },
  ],
  createdAt: "2026-10-14T13:53:45.733Z",
  updatedAt: "2026-10-14T13:53:45.733Z",
} as const satisfies Module
