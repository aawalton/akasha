import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthHealthLines = {
  id: "01a069c1-1f42-7000-8bec-ad0f2db95abc",
  type: "module",
  slug: "oauth-health-lines",
  definition: "the console lines saying an account's OAuth refresh went terminal or came back",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A terminal refresh failure names the account whose refresh stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unrecognised error code is reported as unknown rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to disk.",
    },
  ],
} as const satisfies Module
