import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAudibleCredits = {
  id: "01a06866-06f1-7d56-8ec9-2fc9f52bc4eb",
  pageTypeSlug: "module",
  slug: "monarch-audible-credits",
  definition:
    "the books Alan spent an Audible credit on, written into Monarch as the budget each moved",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A credit spent is two rows against one cash account, one out of the category that paid and one into Audible.",
    },
    {
      invariantKind: "departure",
      statement:
        "The books are read from a tab-separated list Alan keeps rather than from Audible.",
    },
    {
      invariantKind: "departure",
      statement: "The list's first line names its columns and is not a book.",
    },
    {
      invariantKind: "departure",
      statement: "A line missing any of its five columns is refused by its line number.",
    },
    {
      invariantKind: "departure",
      statement:
        "An amount that is not a positive number is refused, because the direction of each row is settled here rather than by the list.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category is named in words and resolved to Monarch's own id before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "A category no file is titled for is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is written unless writing was asked for, and what would be written is printed either way.",
    },
    {
      invariantKind: "departure",
      statement: "A narrowing that matches no book is refused rather than run over nothing.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The cash account and the list's path are spelled here rather than asked of a page.",
    },
  ],
} as const satisfies Module
