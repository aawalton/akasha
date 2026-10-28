import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const applyGrouping = {
  id: "01a05b92-a9c7-704e-8aa4-a6dac71c5707",
  type: "page-type/module",
  slug: "apply-grouping",
  definition: "the buckets holding a view's grouped pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property holding records with a relation field groups by the pages that field names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose records name several pages sits in the group of each, once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group keyed by a page named is headed by that page's title.",
    },
  ],
  createdAt: "2026-09-01T06:05:33.511Z",
  updatedAt: "2026-10-28T22:00:55.911Z",
} as const satisfies Module
