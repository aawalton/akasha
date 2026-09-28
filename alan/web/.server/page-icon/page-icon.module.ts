import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageIcon = {
  id: "01a0e7e2-2a04-72ea-9442-507f9e453362",
  type: "page-type/module",
  slug: "page-icon",
  definition: "the icon a page is drawn with",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming an icon is drawn with that icon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page naming none is drawn with the icon of the nearest page type it is that names one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of two page types equally near, the one named last decides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose icon goes unread is drawn with no icon of its own.",
    },
  ],
} as const satisfies Module
