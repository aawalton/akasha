import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedSheetRows = {
  id: "01a0de6e-26a8-7f96-83bb-6542390fc85b",
  type: "page-type/module",
  slug: "played-sheet-rows",
  definition: "the sheet of a story played's character, read off the rows its pages answer",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's level is the metric whose page type's slug ends in `level`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An attribute is named by its page type's slug in capitals, less the opening the level's slug has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is named by its skill page's title and ranked by its rank page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's score is its level, or its rank where the rank is a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest is keyed by its page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bond is named by the other characters in it and counts its points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attunement is named by its element and its rank, and counts its counter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Skills, bonds and attunements are answered in the order their names sort.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
} as const satisfies Module
