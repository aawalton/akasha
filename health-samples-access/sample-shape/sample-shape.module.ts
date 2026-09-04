import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sampleShape = {
  id: "01a05bc7-9129-7001-9204-f43ce2046c31",
  pageTypeSlug: "module",
  slug: "sample-shape",
  definition: "what a health reading carries, and the metrics one can be",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A metric names the unit its readings are counted in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stored reading carries the instant the reading arrived on top of what was read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here stands at runtime beyond the two lists of metrics.",
    },
  ],
} as const satisfies Module
