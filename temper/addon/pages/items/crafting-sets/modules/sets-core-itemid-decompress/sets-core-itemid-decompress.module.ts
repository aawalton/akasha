import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreItemidDecompress = {
  id: "01a061fc-ceea-731b-8df7-55b760383102",
  type: "page-type/module",
  slug: "sets-core-itemid-decompress",
  definition: "the item ids of a set expanded from their compressed form",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A compressed entry is either a plain item id or a string of a first id and an offset.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set's expanded item ids are cached when first asked for.",
    },
  ],
  createdAt: "2026-09-02T11:59:13.130Z",
  updatedAt: "2026-09-22T13:50:05.000Z",
} as const satisfies Module
