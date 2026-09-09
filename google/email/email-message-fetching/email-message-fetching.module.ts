import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const emailMessageFetching = {
  id: "01a07253-d962-737b-8253-aa8fc539d58e",
  pageTypeSlug: "module",
  type: "module",
  slug: "email-message-fetching",
  definition: "Gmail messages listed and fetched by a caller with no client",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The Gmail client is made for the call rather than handed in by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "The code that reaches Gmail is loaded when a caller asks rather than at import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows a command line.",
    },
  ],
} as const satisfies Module
