import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const booksRoot = {
  id: "01a06584-9bf3-7003-88a1-77ad6df316d7",
  pageTypeSlug: "module",
  slug: "books-root",
  definition: "the checkout folder the books are read from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout without the books folder is refused rather than read as empty.",
    },
    {
      invariantKind: "constraint",
      statement: "The books are read from the checkout this code runs in.",
    },
  ],
} as const satisfies Module
