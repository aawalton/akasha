import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthHealthLines = {
  id: "01a069c1-1f42-7000-8bec-ad0f2db95abc",
  type: "page-type/module",
  slug: "oauth-health-lines",
  definition:
    "the messages a process writes when a registration account's credential failure starts or stops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A terminal refresh failure names the account whose refresh stopped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unrecognised error code is reported as unknown rather than dropped.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to disk.",
    },
  ],
} as const satisfies Module
