import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionOptimizer = {
  id: "01a06152-c2cd-7817-8e93-a08a7fd88008",
  type: "page-type/module",
  slug: "companion-optimizer",
  definition: "scores a companion build by summing the metrics judging the build's roles",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The score sums role metrics with tank and support toughness divided by ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The skill bar is sanitized of role-invalid skills before every evaluation.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A build with no matching role metric evaluates to zero.",
    },
  ],
} as const satisfies Module
