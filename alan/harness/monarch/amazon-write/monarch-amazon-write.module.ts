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
      statement: "The note written is read back from Monarch before that note is called written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row whose note ends in the order number has that number recorded though nothing was written.",
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
        "Nothing is written at all where the caller did not ask to write, and the writes are said instead.",
    },
    {
      invariantKind: "departure",
      statement:
        "Amazon rows are read from the first of January two thousand and twenty-five onward.",
    },
  ],
} as const satisfies Module
