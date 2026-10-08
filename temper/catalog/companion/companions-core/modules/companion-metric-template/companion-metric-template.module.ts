import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionMetricTemplate = {
  id: "01a06108-076d-7d54-8679-103ed9862380",
  type: "page-type/module",
  slug: "companion-metric-template",
  definition: "the shape declaring a companion metric, and the arithmetic working out its value",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric's value is a tree of arithmetic nodes rather than a written function.",
    },
  ],
  createdAt: "2026-09-02T07:31:51.277Z",
  updatedAt: "2026-09-22T13:46:23.000Z",
} as const satisfies Module
