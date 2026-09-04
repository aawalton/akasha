import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sessionReading = {
  id: "01a05c9d-4096-7200-bed7-33491866fccb",
  pageTypeSlug: "module",
  slug: "session-reading",
  definition: "the readings a day's activity is scored from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A health sample is read from its own store rather than from the pages.",
    },
    {
      invariantKind: "departure",
      statement: "The metric read is the active energy a watch records.",
    },
    {
      invariantKind: "departure",
      statement: "The span a caller states is counted in milliseconds rather than in ISO text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out when a day began or ended.",
    },
  ],
} as const satisfies Module
