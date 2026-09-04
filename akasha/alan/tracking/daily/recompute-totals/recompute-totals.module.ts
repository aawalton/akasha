import type { Module } from "@akasha/code-system/module"

export const recomputeTotals = {
  id: "01a069c8-ad1b-7a0c-8cd9-db07a23aaaa5",
  pageTypeSlug: "module",
  slug: "recompute-totals",
  definition: "the cumulative health total each persona carries, worked out and written forward",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This is run as its own program by the name its ops-command page states.",
    },
  ],
} as const satisfies Module
