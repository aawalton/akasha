import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayNarrowTypes = {
  id: "01a06972-b45a-7000-a0e1-63aa928df10a",
  type: "page-type/module",
  slug: "day-narrow-types",
  definition: "the narrow types the daily tracking readers share",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "A type here names no store.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ask that cannot answer has the reason rather than throwing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row names its page rather than a file path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count is taken before any limit.",
    },
  ],
} as const satisfies Module
