import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiSettypePredicates = {
  id: "01a061fc-ceed-70bc-8b87-41bc7b863155",
  type: "page-type/module",
  slug: "sets-core-api-settype-predicates",
  definition:
    "which of the library's set categories a given set falls into, asked one category at a time",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each answer here reads a table on the global whose name is a plain string.",
    },
  ],
} as const satisfies Module
