import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreLifecycleLoaded = {
  id: "01a06231-8f1e-7030-91dc-f0bb68a1c8eb",
  type: "page-type/module",
  slug: "sets-core-lifecycle-loaded",
  definition: "what happens once the game announces this add-on has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The live API version is whatever the client reports unless the constants already name a version.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Saved variables are loaded before any set data is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A debug scan left running across a reload holds back the rest of the load.",
    },
  ],
} as const satisfies Module
