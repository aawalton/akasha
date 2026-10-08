import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatLiveFigures = {
  id: "01a11c11-0c43-712d-a2a1-39d257b9e140",
  type: "page-type/module",
  slug: "combat-live-figures",
  definition: "which live fight figures the HUD bar draws, in what order and as what text",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The live figures are drawn on the HUD bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar draws the live figures in the order the live report has them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The live figures sit on the bar after the inventory fields.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure is drawn only where the setting showing it in the live report is on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Before the first fight the bar draws no live figure.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here calls the game.",
    },
  ],
  createdAt: "2026-10-08T15:10:41.731Z",
  updatedAt: "2026-10-08T15:10:41.731Z",
} as const satisfies Module
