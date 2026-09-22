import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chainRefusal = {
  id: "01a04f71-0570-763b-ac55-da9d9fca21da",
  type: "page-type/module",
  slug: "chain-refusal",
  definition: "a refusal representing its whole command line",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command line has several calls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Judging stops at the first refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line with no call of any kind is refused for nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hook judging each call the hook cuts the same way binds this module rather than spelling the loop.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here defines a call or a reason to refuse a call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A hook hands in the calls the hook cut and the judgement the hook makes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A hook is handed back the one refusal or no refusal.",
    },
  ],
} as const satisfies Module
