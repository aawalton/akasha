import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersAdvancedStats = {
  id: "01a15588-1401-7b6f-bb93-7613df4e6887",
  type: "page-type/module",
  slug: "characters-advanced-stats",
  definition:
    "the character's toughness, damage and healing per second atop the game's Advanced Stats",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The section is the first in the keyboard Advanced Stats list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The section takes the game's own header, row and divider.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's tooltip says what its value measures, as the game's rows do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character the config gives no reading shows no section.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The section is placed again each time the game builds the list again.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The values are those the watcher wrote from the reload before this one.",
    },
  ],
  createdAt: "2026-10-19T18:59:03.808Z",
  updatedAt: "2026-10-19T18:59:03.808Z",
} as const satisfies Module
