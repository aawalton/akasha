import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperHps = {
  id: "01a13c20-c7d3-7f3b-bb59-c86221a8b893",
  type: "page-type/command",
  slug: "temper-hps",
  definition: "the command saying the healing per second a character gives itself over a fight",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skills and their tooltips are read from the character's last reading of each bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character with a bar whose reading kept no skills is refused until a reload keeps them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The fight is 60 seconds long.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each skill is said with its casts and healing, and any tooltip healing left unread.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "hps",
  arguments: [{ argument: "argument/character" }, { argument: "argument/json" }],
  createdAt: "2026-10-14T20:35:43.699Z",
  updatedAt: "2026-10-14T20:35:43.699Z",
} as const satisfies Command
