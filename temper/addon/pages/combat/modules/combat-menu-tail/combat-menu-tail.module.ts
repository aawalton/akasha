import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatMenuTail = {
  id: "01a0617f-584d-7716-b37c-f6c7c2ba573b",
  type: "page-type/module",
  slug: "combat-menu-tail",
  definition: "the later half of the settings menu",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A live figure's setting shows that figure on the HUD bar and in the panel alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panel's layout, scale and background are offered only while the panel is shown.",
    },
  ],
  updatedAt: "2026-10-08T15:14:06.756Z",
} as const satisfies Module
