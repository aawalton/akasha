import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gameReadingComparing = {
  id: "01a155b2-0bbf-7ab6-a43f-c1b6e54b5e30",
  type: "page-type/module",
  slug: "game-reading-comparing",
  definition: "the catalog's rotation reading set beside the one the add-on worked out in the game",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each figure is said from the catalog and from the game, side by side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure is marked where the two part by more than half a percent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each bar's weapon style and multipliers are set beside each other the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bar's armor share and damage taken are each the mean of the martial and the magical one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character the add-on has worked out no reading for is told how to take one.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "This stays until the catalog and the game agree on every figure it sets side by side.",
    },
  ],
  createdAt: "2026-10-19T19:44:54.206Z",
  updatedAt: "2026-10-20T13:29:19.208Z",
} as const satisfies Module
