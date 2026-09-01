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
      statement: "A span holds the instant it starts at.",
    },
    {
      invariantKind: "departure",
      statement: "A span stops before the instant it ends at.",
    },
    {
      invariantKind: "departure",
      statement: "A store that cannot answer throws rather than reading as no readings.",
    },
    {
      invariantKind: "departure",
      statement: "A row answered under some other metric is dropped.",
    },
  ],
} as const satisfies Module
