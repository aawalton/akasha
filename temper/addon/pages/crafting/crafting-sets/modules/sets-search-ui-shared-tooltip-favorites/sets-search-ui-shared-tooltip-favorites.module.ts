import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSharedTooltipFavorites = {
  id: "01a0623c-2df8-7a8a-a8eb-08922192505b",
  type: "page-type/module",
  slug: "sets-search-ui-shared-tooltip-favorites",
  definition: "the tooltips a result row shows for its set",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's saved favourite categories are added and removed here too.",
    },
  ],
} as const satisfies Module
