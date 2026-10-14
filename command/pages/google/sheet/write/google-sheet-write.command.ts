import type { Command } from "akasha/command/command.page-type.types.ts"

export const googleSheetWrite = {
  id: "01a13ab3-9ddd-78ca-84db-ca5549ac0244",
  type: "page-type/command",
  slug: "google-sheet-write",
  definition: "the command writing cells piped in as JSON rows into a range of a sheet",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The cells are piped in as a JSON list of rows, each a list of cells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cell is text, a number, true or false, or null for a cell left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Cells are written as a person typing them would write them, so a formula is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A range naming one cell is filled from that cell down and to the right.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cells that are not that shape are refused before anything is asked of Google.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the range written and how many cells it holds.",
    },
  ],
  name: "write",
  arguments: [
    { argument: "argument/sheet", required: true, saidAs: "flag-or-word" },
    { argument: "argument/sheet-range", required: true },
  ],
  createdAt: "2026-10-14T13:56:52.316Z",
  updatedAt: "2026-10-14T13:56:52.316Z",
} as const satisfies Command
