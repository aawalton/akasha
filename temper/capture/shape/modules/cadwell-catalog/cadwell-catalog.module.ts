import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const cadwellCatalog = {
  id: "01a0604d-239b-7e40-96b8-b77f26524225",
  type: "page-type/module",
  slug: "cadwell-catalog",
  definition: "the zones and points of interest Cadwell's Almanac counts at each level",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A level has zones that have points of interest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone has an order number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point of interest has an order number.",
    },
  ],
} as const satisfies Module
