import type { GameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.types.ts"

export const linearStat = {
  id: "01a0c456-3843-7f99-b8c6-6f1414cceba0",
  type: "page-type/game-mechanic",
  slug: "linear-stat",
  definition: "a stat worked out as a weighted sum of the values a sheet holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A term names a value the sheet holds and how much of that value the term adds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A term naming a value no sheet holds is refused rather than counted as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sum is rounded as the mechanic is asked to round it.",
    },
  ],
} as const satisfies GameMechanic
