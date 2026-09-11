import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const rulePartition = {
  id: "01a0657b-9adc-7005-95a5-a56941403096",
  type: "module",
  slug: "rule-partition",
  definition: "the distinguishable cases a set of rules tells apart, with one witness for each",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field of a type with no realiser leaves the case space unbounded.",
    },
    {
      invariantKind: "departure",
      statement: "A reading past the ceiling is reported unbounded rather than as a whole count.",
    },
    {
      invariantKind: "departure",
      statement: "A rule testing the field a normalizer derives leaves the case space unbounded.",
    },
  ],
} as const satisfies Module
