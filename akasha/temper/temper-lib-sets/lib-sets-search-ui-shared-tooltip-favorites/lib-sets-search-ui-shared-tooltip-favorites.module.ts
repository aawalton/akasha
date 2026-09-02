import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedTooltipFavorites = {
  id: "01a0623c-2df8-7a8a-a8eb-08922192505b",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-tooltip-favorites",
  definition: "the tooltips a result row shows for its set",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set's saved favourite categories are added and removed here too.",
    },
  ],
} as const satisfies Module
