import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionMetricEffect = {
  id: "01a06108-076a-732c-a08f-c97be5fbfaf7",
  type: "page-type/module",
  slug: "companion-metric-effect",
  definition: "the change a source makes to a companion metric",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect names one metric and the way that effect's value is read.",
    },
  ],
  createdAt: "2026-09-02T07:31:51.274Z",
  updatedAt: "2026-09-22T10:15:33.000Z",
} as const satisfies Module
