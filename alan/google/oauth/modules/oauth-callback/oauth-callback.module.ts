import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthCallback = {
  id: "01a05bdc-e25c-702d-a46a-b2274662cd6d",
  type: "module",
  slug: "oauth-callback",
  definition: "the redirect URI and code a consent callback URL carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A callback URL naming an error is refused rather than read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The redirect URI is rebuilt without the query the callback came back with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Quotation marks around a pasted URL are dropped before the URL is parsed.",
    },
  ],
} as const satisfies Module
