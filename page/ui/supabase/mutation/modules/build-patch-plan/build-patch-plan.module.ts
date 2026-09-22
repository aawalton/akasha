import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildPatchPlan = {
  id: "01a05cb4-fefa-7607-bad3-97aa6193d933",
  type: "page-type/module",
  slug: "build-patch-plan",
  definition: "how a page write divides into promoted columns and a JSON patch",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the store has in a column of its own is set on that column.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other key is set in the attributes.",
    },
  ],
} as const satisfies Module
