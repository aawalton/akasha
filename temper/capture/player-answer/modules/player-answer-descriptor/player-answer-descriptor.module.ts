import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAnswerDescriptor = {
  id: "01a0d578-6f2a-7f09-ba83-bb6c91db2342",
  type: "page-type/module",
  slug: "player-answer-descriptor",
  definition: "the name, version and shape the capture of the character hands the game to save",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game saves the answers under `TemperPlayerAnswers_SavedVariables`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Answers are kept under the values asked, joined by commas, then the function's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The values come first, so an item link is written once rather than per function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function asked with nothing keeps its answers under the empty key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to how answers are kept moves the version, so the game clears the old.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version and the time the answers were taken are kept beside them.",
    },
  ],
} as const satisfies Module
