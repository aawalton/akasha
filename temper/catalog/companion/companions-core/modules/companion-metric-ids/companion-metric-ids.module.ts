import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionMetricIds = {
  id: "01a06108-076c-7e9e-8095-bc59ce08217a",
  type: "page-type/module",
  slug: "companion-metric-ids",
  definition: "every quantity a companion build is measured by, named as a type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are the slugs of the stat pages whose subject is companion.",
    },
  ],
  createdAt: "2026-09-02T07:31:51.276Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies Module
