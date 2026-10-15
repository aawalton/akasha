import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperTps = {
  id: "01a13c20-c7d3-7f3b-bb59-c86221a8b893",
  type: "page-type/command",
  slug: "temper-tps",
  definition: "the command saying the toughness per second a character has over a fight",
  code: "ts",
  parts: ["module/last-fight-reading"],
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
      statement: "A weapon enchant that heals is the mean of both bars.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reaving Blows, where slotted, heals its share of the skills' and enchant's direct damage.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Light and heavy attacks deal no damage here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heal is scaled by the average critical heal and by healing done and taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Direct damage is scaled by the average critical strike before Reaving Blows takes its share.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A shield is not scaled by a critical heal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The combat add-on's last fight for the character is said after the estimate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Max health, armor and damage taken are the mean of both bars' readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A weapon enchant goes off at the end of every fourth tick; Reaving Blows heals in its hit's tick.",
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
      decisionKind: "decision-kind/departure",
      statement:
        "The ultimate's cost and the healing each point spent gives are the mean of both bars.",
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
  updatedAt: "2026-10-15T15:24:24.033Z",
} as const satisfies Command
