import type { Module } from "../../code-system/modules/module.page-type.ts"

export const ruleConditions = {
  id: "01a0657b-9adc-7004-9d71-1576f12eb0cf",
  pageTypeSlug: "module",
  slug: "rule-conditions",
  definition: "the conditions a rule's match is made of, and whether one match covers another",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A match with no `# Match` heading holds no conditions.",
    },
    {
      invariantKind: "departure",
      statement: "A line under `# Match` that is neither a condition nor a value is counted stray.",
    },
    {
      invariantKind: "departure",
      statement:
        "A condition pairing a field with a comparison that field does not admit is mispaired.",
    },
  ],
} as const satisfies Module
