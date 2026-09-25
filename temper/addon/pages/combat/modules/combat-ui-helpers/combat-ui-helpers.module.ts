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
      statement:
        "A tip over the report's controls is Temper's popover, gone when the pointer leaves.",
    },
  ],
} as const satisfies Module
