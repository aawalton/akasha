import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lastFightReading = {
  id: "01a1402a-1c61-718a-9f38-8d2864c9aa2e",
  type: "page-type/module",
  slug: "last-fight-reading",
  definition: "the combat add-on's last fight, read from the game's saved variables and said",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight's toughness per second is the mean of each tick's killing hit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick's max health, shield and armor are what the game had in that tick.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A fight's damage taken is the reading's, since the game keeps no stat for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick sampled before the fight's first sample is left out.",
    },
  ],
  createdAt: "2026-10-15T15:24:24.033Z",
  updatedAt: "2026-10-15T15:24:24.033Z",
} as const satisfies Module
