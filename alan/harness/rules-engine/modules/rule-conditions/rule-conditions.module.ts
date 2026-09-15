import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleConditions = {
  id: "01a0657b-9adc-7004-9d71-1576f12eb0cf",
  type: "module",
  slug: "rule-conditions",
  definition: "the fields a rule set declares, and the conditions a rule's match is made of",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field's type is read off the rule set that declares that field.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A condition naming a field the rule set did not declare has no type here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Nothing here reads a rule, and nothing works out whether one match covers another.",
    },
  ],
} as const satisfies Module
