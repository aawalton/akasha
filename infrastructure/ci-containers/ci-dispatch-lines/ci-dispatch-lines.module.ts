import type { Module } from "@akasha/code-system/module"

export const ciDispatchLines = {
  id: "01a06861-24c9-7002-933d-746d5bfca3e9",
  pageTypeSlug: "module",
  slug: "ci-dispatch-lines",
  definition: "the log line each placement decision is read from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A bind line carries the whole node snapshot the choice was made against.",
    },
  ],
} as const satisfies Module
