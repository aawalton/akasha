import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnRoleplaying = {
  id: "01a14b00-94c7-72f8-aece-431c20608f99",
  type: "page-type/module",
  slug: "turn-roleplaying",
  definition: "what a roleplayed turn takes at world-builder, and where that moves it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn takes its prose at world-builder, from the roleplay seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn's prose moves it to game-master, for its beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn takes no lore, since the roleplay-worldbuilder files it apart.",
    },
  ],
  createdAt: "2026-10-17T17:54:51.718Z",
  updatedAt: "2026-10-17T17:54:51.718Z",
} as const satisfies Module
