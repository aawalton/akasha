import type { Module } from "@akasha/code-system/module"

export const pageQueryValues = {
  id: "01a0686e-6807-7004-b553-004544e7e12b",
  pageTypeSlug: "module",
  slug: "page-query-values",
  definition: "the text, or the list of text, that one key of a page's values holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key holding a list reads as no text rather than as the first of the list.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding text reads as a list of that one text.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding nothing reads as an empty list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
