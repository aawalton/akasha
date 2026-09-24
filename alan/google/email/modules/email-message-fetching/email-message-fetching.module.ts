import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailMessageFetching = {
  id: "01a07253-d962-737b-8253-aa8fc539d58e",
  type: "page-type/module",
  slug: "email-message-fetching",
  definition: "Gmail messages listed and fetched by a caller with no client",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Gmail client is made for the call rather than handed in by the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Gmail client is loaded when a caller asks rather than at import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows a command line.",
    },
  ],
} as const satisfies Module
