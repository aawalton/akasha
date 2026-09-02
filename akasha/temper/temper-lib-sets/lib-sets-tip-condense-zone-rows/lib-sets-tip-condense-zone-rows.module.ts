import type { Module } from "@akasha/code-system/module"

export const libSetsTipCondenseZoneRows = {
  id: "01a06231-8f1f-78f5-97c7-1f55147e7bd8",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-condense-zone-rows",
  definition: "folding away zone rows that repeat the same names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row counts as a duplicate only when every name field matches.",
    },
  ],
} as const satisfies Module
