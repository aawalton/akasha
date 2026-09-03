import type { Module } from "@akasha/code-system/module"

export const pageQueryRequest = {
  id: "01a06874-32db-7000-85c2-0567c0db08d6",
  pageTypeSlug: "module",
  slug: "page-query-request",
  definition: "what a request to a page query carries, and what it answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An argument said once is a value and an argument said twice is a list.",
    },
    {
      invariantKind: "departure",
      statement: "A name that will not decode reads as no name rather than as the bytes given.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name holding an empty, a dot, a double dot or a backslash segment reads as no name.",
    },
    {
      invariantKind: "departure",
      statement: "A list is a value only where every one of its entries is text.",
    },
    {
      invariantKind: "departure",
      statement: "A list is no record, so a body that is a list reads as no record.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or reaches the network.",
    },
  ],
} as const satisfies Module
