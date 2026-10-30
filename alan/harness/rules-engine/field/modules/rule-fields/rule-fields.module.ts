import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleFields = {
  id: "01a18da4-e2ed-79fd-9b61-312fdd806480",
  type: "page-type/module",
  slug: "rule-fields",
  definition: "the type of each property a rule reads",
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
  ],
  createdAt: "2026-10-30T16:29:15.884Z",
  updatedAt: "2026-10-30T16:29:15.884Z",
} as const satisfies Module
