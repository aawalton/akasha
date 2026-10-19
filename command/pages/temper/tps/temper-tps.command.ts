import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperTps = {
  id: "01a13c20-c7d3-7f3b-bb59-c86221a8b893",
  type: "page-type/command",
  slug: "temper-tps",
  definition:
    "the command saying the toughness, damage and healing per second a character has over a fight",
  code: "ts",
  parts: ["module/last-fight-reading", "module/game-reading-comparing"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The estimate is the character's rotation reading.",
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
      statement: "The reading the add-on worked out in the game is set beside the estimate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The combat add-on's last fight for the character is said after the estimate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last fight says the Magicka, Stamina and Ultimate gained and spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The estimate builds Ultimate from none, and the last fight says the Ultimate the game had.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The last fight is read from the game's saved variables rather than landed in akasha.",
    },
  ],
  name: "tps",
  arguments: [{ argument: "argument/character" }, { argument: "argument/json" }],
  createdAt: "2026-10-14T20:35:43.699Z",
  updatedAt: "2026-10-19T19:44:54.206Z",
} as const satisfies Command
