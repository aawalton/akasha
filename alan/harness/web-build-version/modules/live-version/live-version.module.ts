import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const liveVersion = {
  id: "01a05c48-deeb-700f-82ef-afcd8de33755",
  type: "page-type/module",
  slug: "live-version",
  definition: "the response a running site answers with when asked which commit it is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is never cached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build with no commit answers with the reason rather than with nothing.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Module
