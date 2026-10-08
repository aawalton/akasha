import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatUiHelpers = {
  id: "01a0617f-5854-7436-80c0-4ddfc30e1be9",
  type: "page-type/module",
  slug: "combat-ui-helpers",
  definition: "the small drawing chores the report's panels share",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tip over the report's controls is the game's information tooltip.",
    },
  ],
  createdAt: "2026-09-02T09:42:10.772Z",
  updatedAt: "2026-09-26T15:55:29.000Z",
} as const satisfies Module
