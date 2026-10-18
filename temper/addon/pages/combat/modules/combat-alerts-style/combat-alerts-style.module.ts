import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatAlertsStyle = {
  id: "01a0de75-9a8d-71a5-ab9b-2f5ea4dc61c8",
  type: "page-type/module",
  slug: "combat-alerts-style",
  definition: "the fonts the combat alerts draw with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The alerts draw in the game's keyboard faces in gamepad mode as well.",
    },
  ],
  createdAt: "2026-09-26T16:04:04.365Z",
  updatedAt: "2026-10-18T17:41:31.574Z",
} as const satisfies Module
