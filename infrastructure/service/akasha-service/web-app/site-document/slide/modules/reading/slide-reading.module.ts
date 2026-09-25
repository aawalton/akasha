import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const slideReading = {
  id: "01a0d624-9333-7b61-8905-306e02a3c6ac",
  type: "page-type/module",
  slug: "slide-reading",
  definition: "the slides of a deck, read in order for a route's loader",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slide of no known kind, and a point with no title, are not shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point's color or icon outside the known set is shown as none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slide's picture is read as the path its site serves that image page at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image page is served to anyone only while a slide shows it.",
    },
  ],
} as const satisfies Module
