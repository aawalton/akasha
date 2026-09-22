import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDebugDebugHelpers = {
  id: "01a0623c-2df7-7868-8d71-09bd658923d5",
  type: "page-type/module",
  slug: "sets-debug-debug-helpers",
  definition: "the set ids missing from the preloaded tables and the squeeze on item id lists",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of consecutive item ids is written as a start value and a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Set ids named as belonging to a newer API version count as new on a live client.",
    },
  ],
} as const satisfies Module
