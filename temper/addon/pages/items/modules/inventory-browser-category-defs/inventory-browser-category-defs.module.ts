import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBrowserCategoryDefs = {
  id: "01a06258-b528-7c65-b79d-9e36f50d9a1d",
  type: "page-type/module",
  slug: "inventory-browser-category-defs",
  definition: "the categories and subfilters the cross-character browser offers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each category and subfilter is labelled and ordered by its page as the add-on compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which items a category or subfilter takes in is held here under its page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose slug nothing here holds is offered by no category.",
    },
  ],
} as const satisfies Module
