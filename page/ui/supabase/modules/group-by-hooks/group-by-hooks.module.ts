import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const groupByHooks = {
  id: "01a06164-b506-7000-96d8-f93d8e08fff0",
  type: "page-type/module",
  slug: "group-by-hooks",
  definition: "React hook querying pages by page type and bucketing its rows into groups.",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is put in every group the view's group definition keys it under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No group key is worked out here apart from that definition.",
    },
  ],
  createdAt: "2026-09-02T09:13:05.030Z",
  updatedAt: "2026-10-28T22:20:49.463Z",
} as const satisfies Module
