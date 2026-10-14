import type { Command } from "akasha/command/command.page-type.types.ts"

export const googleSheetRead = {
  id: "01a13ab3-9ddd-704b-959e-9927a11a3d93",
  type: "page-type/command",
  slug: "google-sheet-read",
  definition: "the command answering the cells a range of a sheet holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The range read is answered first, then each row on a line, its cells parted by tabs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no range reads the whole tab the URL names, or else the first tab.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to a sheet.",
    },
  ],
  name: "read",
  arguments: [
    { argument: "argument/sheet", required: true, saidAs: "flag-or-word" },
    { argument: "argument/sheet-range" },
    { argument: "argument/json" },
  ],
  createdAt: "2026-10-14T13:56:52.316Z",
  updatedAt: "2026-10-14T13:56:52.316Z",
} as const satisfies Command
