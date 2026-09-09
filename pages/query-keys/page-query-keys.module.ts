import type { Module } from "@akasha/code/module"

export const pageQueryKeys = {
  id: "01a06879-ef4b-7001-ab47-02e822f92b2a",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-query-keys",
  definition: "which of a page's keys a query asks for, and so what a derivation must have",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A key a query sorts by or reduces or counts by or tests on is asked for as a named key is.",
    },
    {
      invariantKind: "departure",
      statement: "A key is asked for once however many times a query names that key.",
    },
    {
      invariantKind: "departure",
      statement: "A query naming no key and reducing nothing asks for the whole page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is carried only where the query asks for that body or asks for the whole page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or answers a query.",
    },
  ],
} as const satisfies Module
