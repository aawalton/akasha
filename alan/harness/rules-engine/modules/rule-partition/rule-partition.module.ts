import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rulePartition = {
  id: "01a0657b-9adc-7005-95a5-a56941403096",
  type: "module",
  slug: "rule-partition",
  definition: "whether the conditions a rule states hold of one case",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every condition of a match must hold for that match to hold.",
    },
    {
      invariantKind: "departure",
      statement: "A match stating no condition holds of every case.",
    },
    {
      invariantKind: "departure",
      statement: "A negated condition holds where no value that condition names holds.",
    },
    {
      invariantKind: "departure",
      statement: "A condition on a field the rule set did not declare holds of nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A condition on a list field holds of nothing, a list having no realiser here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the cases a rule set can tell apart.",
    },
  ],
} as const satisfies Module
