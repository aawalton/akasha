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
      statement: "A reading keeps the ids of the buffs on the player when it was taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading says whether the player was in combat when it was taken.",
    },
  ],
  createdAt: "2026-10-14T14:03:56.194Z",
  updatedAt: "2026-10-14T14:03:56.194Z",
} as const satisfies Module
