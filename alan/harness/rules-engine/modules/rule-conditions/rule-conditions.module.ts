import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleConditions = {
  id: "01a0657b-9adc-7004-9d71-1576f12eb0cf",
  type: "page-type/module",
  slug: "rule-conditions",
  definition: "the conditions a rule matches on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here reads a rule, and nothing works out whether one match covers another.",
    },
  ],
  createdAt: "2026-09-03T04:16:34.524Z",
  updatedAt: "2026-10-30T16:29:15.884Z",
} as const satisfies Module
