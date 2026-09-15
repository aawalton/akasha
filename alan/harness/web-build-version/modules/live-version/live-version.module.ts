import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const liveVersion = {
  id: "01a05c48-deeb-700f-82ef-afcd8de33755",
  type: "module",
  slug: "live-version",
  definition: "the response a running site answers with when asked which commit it is",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer is never cached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build with no commit answers with the reason rather than with nothing.",
    },
  ],
} as const satisfies Module
