import type { Module } from "../../code-system/modules/module.page-type.ts"

export const askThrough = {
  id: "01a05c9d-4096-7100-bdfa-0be0514d547c",
  pageTypeSlug: "module",
  slug: "ask-through",
  definition: "the page store bound to the port the readout engine asks through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A port is made for each call rather than held between calls.",
    },
    {
      invariantKind: "departure",
      statement: "Every call through the port raises.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the query the caller asked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a query or a readout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "A readout is drawn from a query its caller states whole.",
    },
  ],
} as const satisfies Module
