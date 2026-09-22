import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDebugScanReport = {
  id: "01a0c514-b1a1-7002-b5cf-cfa8a286e6f5",
  type: "page-type/module",
  slug: "sets-debug-scan-report",
  definition: "the counts a scanned package reports and what a finished scan writes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The uncompressed item id table is deleted again unless asked to keep that table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scan is taken as finished once ten packages in a row find no further set.",
    },
  ],
} as const satisfies Module
