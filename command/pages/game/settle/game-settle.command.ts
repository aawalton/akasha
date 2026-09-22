import type { Command } from "akasha/command/command.page-type.types.ts"

export const gameSettle = {
  id: "01a0c600-9161-7fdb-8ac2-edc582abc988",
  type: "page-type/command",
  slug: "game-settle",
  definition: "the command settling a turn's numbers by running the mechanic it is told",
  code: "ts",
  test: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbers come from the mechanic, and the caller hands in only the reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run naming dice is rolled here rather than handed a roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is written to the game's rows before its numbers are answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanic that refuses writes no row.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No call says the seed a roll is rolled from.",
    },
  ],
  name: "settle",
  arguments: [
    { argument: "argument/game", required: true },
    { argument: "argument/turn", required: true },
    { argument: "argument/mechanic", required: true },
    { argument: "argument/reading", required: true },
    { argument: "argument/dice" },
    { argument: "argument/bonuses" },
  ],
} as const satisfies Command
