import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagesCollection = {
  id: "01a05b69-4543-700b-b4dc-8cbbeb663941",
  type: "page-type/module",
  slug: "pages-collection",
  definition: "the collection holding the page rows",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The collection keeps its rows and keeps syncing while nothing is subscribed to it.",
    },
  ],
} as const satisfies Module
