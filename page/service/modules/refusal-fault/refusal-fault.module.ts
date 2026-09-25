import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const refusalFault = {
  id: "01a0d92a-75b2-7000-b56b-cc28e4f4593c",
  type: "page-type/module",
  slug: "refusal-fault",
  definition: "whose fault a refusal the pages hand back was",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal the pages hand back carries its fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault is the caller's, the service's, or a race's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault is named where the refusal is made rather than read off its words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller's fault is answered 400, the service's 500, and a race's 409.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a refusal a race brought on may land when sent again unchanged.",
    },
  ],
} as const satisfies Module
