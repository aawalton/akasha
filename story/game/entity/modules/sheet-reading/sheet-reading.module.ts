import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sheetReading = {
  id: "01a0c64e-ee87-7b43-becb-4e3044d829c0",
  type: "page-type/module",
  slug: "sheet-reading",
  definition: "what an old engine's sheet says, read into the lists an entity page carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A number the sheet worked out is passed over, since a mechanic works it out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word the sheet uses for an attribute is read as that attribute's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is worn and what is carried come off the sheet as one list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the sheet has that no property holds is folded into the note.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page or reaches the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a game master appended to a sheet turn by turn is history, and comes off.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No sheet carries where one of its lines came from, because git holds that.",
    },
  ],
} as const satisfies Module
