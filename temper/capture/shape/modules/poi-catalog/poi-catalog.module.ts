import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const poiCatalog = {
  id: "01a0604d-239f-7a9e-93f5-6776a2876885",
  type: "page-type/module",
  slug: "poi-catalog",
  definition: "the points of interest a zone holds and what kind each one is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone has the points of interest found in that zone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone key and a point of interest key are both numbers.",
    },
  ],
} as const satisfies Module
