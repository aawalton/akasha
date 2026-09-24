import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kitLoading = {
  id: "01a0b746-3ada-7ac2-849e-7cfce758883c",
  type: "page-type/module",
  slug: "kit-loading",
  definition: "what Alan has to load a movement with, and the loads it offers",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Kit Alan does not have to hand offers no loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The top load for a movement is the heaviest the kit covering it offers.",
    },
  ],
} as const satisfies Module
