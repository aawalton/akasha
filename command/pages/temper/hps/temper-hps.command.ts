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
      statement: "Nothing here writes to the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The combat add-on's last fight for the character is said after the estimate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game's healing per second is healing and absorbs over the fight's active seconds.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The last fight is read from the game's saved variables rather than landed in akasha.",
    },
  ],
  name: "hps",
  arguments: [{ argument: "argument/character" }, { argument: "argument/json" }],
  createdAt: "2026-10-14T20:35:43.699Z",
  updatedAt: "2026-10-14T22:33:48.949Z",
} as const satisfies Command
