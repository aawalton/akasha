import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageCardRenderer = {
  id: "01a06257-46e8-7470-a359-c1ab21da09b4",
  type: "page-type/module",
  slug: "page-card-renderer",
  definition: "the card a row of a view is shown as",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gallery card's picture may be an image page as well as an address.",
    },
  ],
} as const satisfies Module
