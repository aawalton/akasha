import type { Module } from "@akasha/code/module"

export const pageQueryRequest = {
  id: "01a06874-32db-7000-85c2-0567c0db08d6",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-query-request",
  definition: "what a request to a page query has, and what it answers with",
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
        "A name with a segment that is empty or a dot or a double dot or a backslash reads as no name.",
    },
    {
      invariantKind: "departure",
      statement: "A list is a value only where every entry in that list is text.",
    },
    {
      invariantKind: "departure",
      statement: "A list is no record.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is a list reads as no record.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or reaches the network.",
    },
  ],
} as const satisfies Module
