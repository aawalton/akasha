import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersReportedStats = {
  id: "01a13aba-15a3-7b78-9f8e-67140b6bcc70",
  type: "page-type/module",
  slug: "characters-reported-stats",
  definition: "the character sheet's numbers for the bar now held, read into the saved table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat is named by the metric the stat calculator gives the same number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is taken for the bar held, and the other bar's last reading is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps the ability id and the name of each buff on the player when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the text the game gives each of those buffs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the effect text and the stacks the game gives each buff now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps each stat a second time as the game gives it without bonuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading says whether the player was in combat when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the points spent on each champion star and the most it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps the bonus the game says each champion star gives now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading keeps whether the game lets each champion star be slotted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading keeps each worn piece's link, armor, enchantment and trait text, and quality.",
    },
  ],
  createdAt: "2026-10-14T14:03:56.194Z",
  updatedAt: "2026-10-14T18:29:30.517Z",
} as const satisfies Module
