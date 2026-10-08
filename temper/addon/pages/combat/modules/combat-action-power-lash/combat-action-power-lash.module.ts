import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatActionPowerLash = {
  id: "01a0617f-5833-7731-89e4-8a2778621a73",
  type: "page-type/module",
  slug: "combat-action-power-lash",
  definition: "the Power Lash proc, which the game announces nowhere and only polling finds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The prompt shows Flame Lash's own slot icon where the game names no Power Lash icon.",
    },
  ],
  createdAt: "2026-09-02T09:42:10.739Z",
  updatedAt: "2026-09-25T19:53:15.000Z",
} as const satisfies Module
