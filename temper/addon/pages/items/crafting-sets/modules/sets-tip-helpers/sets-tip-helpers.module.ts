import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipHelpers = {
  id: "01a06231-8f1e-736e-ac26-89f86f494749",
  type: "page-type/module",
  slug: "sets-tip-helpers",
  definition: "the set info line's small text builders",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each text is built once with icons and once without.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Favourite categories show as icons alone with no words.",
    },
  ],
} as const satisfies Module
