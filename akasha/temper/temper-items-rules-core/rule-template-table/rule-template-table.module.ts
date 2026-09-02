import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleTemplateTable = {
  id: "01a06100-3bfd-7c3a-a467-2c2131163905",
  pageTypeSlug: "module",
  slug: "rule-template-table",
  definition: "the 48 rule templates gathered from the two groups holding them, in one order",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the rule-template pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A template's place in this table is the order the rules are tried in.",
    },
    {
      invariantKind: "gap",
      statement: "A template moved to another place changes which rule an item matches first.",
    },
  ],
} as const satisfies Module
