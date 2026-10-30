import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleConditions = {
  id: "01a0657b-9adc-7004-9d71-1576f12eb0cf",
  type: "page-type/module",
  slug: "rule-conditions",
  definition: "the conditions a rule matches on and the properties a rule reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field's type is read off the rule set that declares that field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition naming a field the rule set did not declare has no type here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here reads a rule, and nothing works out whether one match covers another.",
    },
  ],
  createdAt: "2026-09-03T04:16:34.524Z",
  updatedAt: "2026-10-30T16:08:41.853Z",
} as const satisfies Module
