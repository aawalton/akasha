import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsMain = {
  id: "01a0623e-53a2-76c1-87da-62ae3b18e16e",
  type: "page-type/module",
  slug: "sets-main",
  definition: "the add-on's single entry point",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
  ],
} as const satisfies Module
