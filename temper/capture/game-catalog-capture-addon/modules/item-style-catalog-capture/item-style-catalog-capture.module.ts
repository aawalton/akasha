import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemStyleCatalogCapture = {
  id: "01a0e0f2-697c-7cf9-9031-3b1551744880",
  type: "page-type/module",
  slug: "item-style-catalog-capture",
  definition:
    "the game's name for each crafting style, read out of the client into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every number from `ITEMSTYLE_MIN_VALUE` to `ITEMSTYLE_MAX_VALUE` is asked its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number the game answers with no name is left out.",
    },
  ],
} as const satisfies Module
