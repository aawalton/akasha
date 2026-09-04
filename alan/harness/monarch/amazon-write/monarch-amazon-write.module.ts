import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAmazonWrite = {
  id: "01a06866-06f1-72f6-aae7-817014db4c00",
  pageTypeSlug: "module",
  slug: "monarch-amazon-write",
  definition: "the Amazon note written onto a transaction, and the order number kept beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A note is written only where the row carries none.",
    },
    {
      invariantKind: "departure",
      statement: "What was written is read back from Monarch before it is called written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row whose note already ends in the order number has its order number recorded even though nothing was written, so a half-done write repairs itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "The order number recorded is read back from the file before the write is called done.",
    },
    {
      invariantKind: "departure",
      statement: "A note Monarch respelled is reported as respelled rather than as unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "A row already carrying the order number is not rewritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is written at all where the caller did not ask to write, and what would have happened is said instead.",
    },
    {
      invariantKind: "departure",
      statement:
        "Amazon rows are read from the first of January two thousand and twenty-five onward.",
    },
  ],
} as const satisfies Module
