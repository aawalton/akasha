import type { Module } from "@akasha/code/module"

export const monarchSyncing = {
  id: "01a0686a-7a57-7488-a53f-a41a698c4316",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-syncing",
  definition: "the whole of Monarch copied and the copy compared against it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every account and category and tag and merchant and holding and transaction lands on a full run.",
    },
    {
      invariantKind: "departure",
      statement: "Our copy is reported against Monarch's own totals once the landing is done.",
    },
    {
      invariantKind: "departure",
      statement: "The category rules are run over the rows that arrived.",
    },
    {
      invariantKind: "departure",
      statement: "The full pass repairs the rows the minutely poll left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run told to be incremental lands the trusted window rather than the whole of Monarch.",
    },

    {
      invariantKind: "departure",
      statement: "A failing account is caught and named rather than stopping the rest.",
    },
    {
      invariantKind: "departure",
      statement: "Every account is tried before the run ends.",
    },
    {
      invariantKind: "departure",
      statement: "A run in which any account failed ends non-zero.",
    },
  ],
} as const satisfies Module
