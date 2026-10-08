import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatHudFields = {
  id: "01a11c12-9fd2-7a0f-93f7-8787a6787b35",
  type: "page-type/module",
  slug: "combat-hud-fields",
  definition: "the live fight figures put on the HUD bar, and the last fight's figures kept for it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each live figure is a field of its own on the HUD bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar keeps the last fight's figures until the next fight replaces them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar takes its figures from the fight recap the live report reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar draws its figures whether or not the live report is shown.",
    },
  ],
  createdAt: "2026-10-08T15:12:25.042Z",
  updatedAt: "2026-10-08T15:12:25.042Z",
} as const satisfies Module
