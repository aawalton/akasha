import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mechanicSettling = {
  id: "01a0c5fc-ff8d-7b07-aea9-4e0a5e9edb7c",
  type: "page-type/module",
  slug: "mechanic-settling",
  definition: "rolling the dice a mechanic needs and running that mechanic over a turn",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbers a turn settles come from the mechanic the game names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is settled from the run before, before the roll is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run before is the last run page a game has, read off the file beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no run comes before, the game's own name seeds the roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dice a mechanic reads are rolled here rather than handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bonuses a run counts are handed in beside the reading rather than inside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run holds the reading the mechanic saw, dice and bonuses and all.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a run or names a mechanic.",
    },
  ],
} as const satisfies Module
