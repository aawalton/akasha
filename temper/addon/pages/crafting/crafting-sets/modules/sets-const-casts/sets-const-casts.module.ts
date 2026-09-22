import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsConstCasts = {
  id: "01a061d7-7bc6-7f09-8a94-7988ce547bf5",
  type: "page-type/module",
  slug: "sets-const-casts",
  definition: "an unchecked cast onto an array of DLC entries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The cast asserts the type rather than checking that type.",
    },
  ],
} as const satisfies Module
