import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleConditions = {
  id: "01a0657b-9adc-7004-9d71-1576f12eb0cf",
  type: "page-type/module",
  slug: "rule-conditions",
  definition: "the fields a rule set declares, and a rule's match conditions",
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
} as const satisfies Module
