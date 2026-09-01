import type { Module } from "../../code-system/module/module.page-type.ts"

export const sampleSelecting = {
  id: "01a05bc7-9129-7004-a85c-285fd90a0c08",
  pageTypeSlug: "module",
  slug: "sample-selecting",
  definition: "the readings of one metric over a span of time, oldest first",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This raises rather than answering a span that held nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page type nothing answers for.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the metric and the span asked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "A health reading is a page akasha carries.",
    },
  ],
} as const satisfies Module
