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
      statement:
        "A roleplayed turn takes its beats and the prose written from them at world-builder, in one advance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That advance comes from the roleplay seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That advance moves the turn as a game master's beats on prose already written would.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roleplayed turn at world-builder refuses prose without beats and beats without prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Prose with beats is refused anywhere but a roleplayed turn at world-builder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn takes no lore, since the roleplay-worldbuilder files it apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roleplayed turn runs no picture recorder, since the roleplay-illustrator pictures it.",
    },
  ],
  createdAt: "2026-10-17T17:54:51.718Z",
  updatedAt: "2026-10-17T21:08:24.850Z",
} as const satisfies Module
