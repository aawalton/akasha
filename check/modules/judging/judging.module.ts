import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const judging = {
  id: "01a04bc4-7e86-7fa6-8d9b-5532730b7daf",
  type: "page-type/module",
  slug: "judging",
  definition: "the refusals a check answers with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here imports a check or a command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check is handed a change and the shadow that change reads through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal says whether the refusal is about what the check cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal saying nothing about cost is about what the check found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit is handed the root alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "There is no change at audit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The two answer the same refusals.",
    },
  ],
} as const satisfies Module
