import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDebugDebugIndex = {
  id: "01a0623c-2df8-74ef-9c3b-b2e335ab7b97",
  type: "page-type/module",
  slug: "sets-debug-debug-index",
  definition: "the order the debug modules are loaded in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This file has imports and nothing else.",
    },
  ],
} as const satisfies Module
