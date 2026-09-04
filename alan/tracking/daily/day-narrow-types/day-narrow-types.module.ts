import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayNarrowTypes = {
  id: "01a06972-b45a-7000-a0e1-63aa928df10a",
  pageTypeSlug: "module",
  slug: "day-narrow-types",
  definition: "the narrow types the daily tracking readers share",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A type here names no store.",
    },
    {
      invariantKind: "departure",
      statement: "An ask that cannot answer carries the reason rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "A row names its page rather than a file path.",
    },
    {
      invariantKind: "departure",
      statement: "A count is taken before any limit.",
    },
  ],
} as const satisfies Module
