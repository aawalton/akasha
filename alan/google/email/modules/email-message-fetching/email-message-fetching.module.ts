import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailMessageFetching = {
  id: "01a07253-d962-737b-8253-aa8fc539d58e",
  type: "page-type/module",
  slug: "email-message-fetching",
  definition: "how code reads Gmail messages",
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
  createdAt: "2026-09-05T16:08:12.898Z",
  updatedAt: "2026-10-30T15:10:59.961Z",
} as const satisfies Module
