import type { Command } from "akasha/command/command.page-type.types.ts"

export const chessPlay = {
  id: "01a0a03d-5a6a-7d7d-981a-14813c990218",
  type: "page-type/command",
  slug: "chess-play",
  definition: "the command playing a game out against the Maia model and writing it down",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A band no Maia weights are held for refuses the call before a move is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The side Alan takes is named on the call, and white is taken where none is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no position opens from the first rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A side naming neither white nor black refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A side that answers no move resigns, and the other side wins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A finished game lands as a page, and the moves land in a file beside that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is written through the change working out what kind of path it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writing a game goes through is handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that played before it threw says in its refusal what that run had done.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No test here runs an engine.",
    },
  ],
  name: "play",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/band" },
    { argument: "argument/color" },
    { argument: "argument/fen" },
  ],
} as const satisfies Command
