import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperStatCompare = {
  id: "01a13ac6-0c63-7b9c-bc03-6035eeeed9e2",
  type: "page-type/command",
  slug: "temper-stat-compare",
  definition:
    "the command setting a character's stats as the game reported them beside Temper's estimate",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading and the build are read from the character's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The estimate for each bar takes exactly the buffs that bar's reading listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the stats where the reading and the estimate differ are shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff the reading listed that no buff page names is said by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading that kept no buff names refuses the call until a fresh one is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "stat-compare",
  arguments: [{ argument: "argument/character" }, { argument: "argument/json" }],
  createdAt: "2026-10-14T14:17:00.259Z",
  updatedAt: "2026-10-14T14:17:00.259Z",
} as const satisfies Command
