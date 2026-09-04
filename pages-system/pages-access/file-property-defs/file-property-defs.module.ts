import type { Module } from "@akasha/code-system/module"

export const filePropertyDefs = {
  id: "01a05bd6-c530-72bb-9046-ba72f58fad9b",
  pageTypeSlug: "module",
  slug: "file-property-defs",
  definition: "the property definitions a file-backed page type declares",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a page type declares is asked of `@akasha/pages-system-service`.",
    },
    {
      invariantKind: "absence",
      statement: "An empty list is never answered for a page type that is there.",
    },
    {
      invariantKind: "departure",
      statement: "A page type nothing carries is answered as null rather than as an empty list.",
    },
    {
      invariantKind: "departure",
      statement: "A shape answered once is held for every later question.",
    },
    {
      invariantKind: "departure",
      statement: "A shape refused is asked for again.",
    },
    {
      invariantKind: "departure",
      statement: "A shape carries the property naming the account a page belongs to.",
    },
  ],
} as const satisfies Module
