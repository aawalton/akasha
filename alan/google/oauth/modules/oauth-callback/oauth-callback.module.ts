import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthCallback = {
  id: "01a05bdc-e25c-702d-a46a-b2274662cd6d",
  type: "page-type/module",
  slug: "oauth-callback",
  definition: "what code reads from the URL Google sends to the browser after consent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A callback URL naming an error is refused rather than read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The redirect URI is rebuilt without the query the callback came back with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Quotation marks around a pasted URL are dropped before the URL is parsed.",
    },
  ],
  createdAt: "2026-09-01T07:26:37.660Z",
  updatedAt: "2026-10-30T16:27:59.993Z",
} as const satisfies Module
