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
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a set drops is shown in Temper's popover, under the set's name.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set's item is shown in the game's own item tooltip, which only the game fills.",
    },
  ],
} as const satisfies Module
