import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const tallyBoundary = {
  id: "01a05b71-e544-7465-a8e6-f573101bde13",
  pageTypeSlug: "module",
  slug: "tally-boundary",
  definition:
    "how each turn opens and how it closes, and the stretches over which those stay the same",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stretch counts as uniform once it reaches the catalog's threshold.",
    },
    {
      invariantKind: "departure",
      statement:
        "A screen's regex is compiled without the flags that would carry state between tests.",
    },
  ],
} as const satisfies Module
