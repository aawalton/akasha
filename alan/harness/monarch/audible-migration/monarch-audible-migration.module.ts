import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAudibleMigration = {
  id: "01a06866-06f1-7168-a141-d8d56c28cd00",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-audible-migration",
  definition:
    "the Audible charges already standing, carried onto the budget scheme that replaced them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A charge is transferred or recategorized only or already done.",
    },
    {
      invariantKind: "departure",
      statement: "The outcome is decided before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "A charge already carrying the Audible category is done rather than moved again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A charge is found by the word Audible in its merchant or its statement line or its note.",
    },
    {
      invariantKind: "departure",
      statement: "A row this scheme itself wrote is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A credit and an uncategorized charge and a charge noted as reimbursed are recategorized only.",
    },
    {
      invariantKind: "departure",
      statement:
        "History is carried from the first of January two thousand and twenty-five onward and no earlier.",
    },
    {
      invariantKind: "departure",
      statement: "The decider is recorded as this migration rather than as a rule.",
    },
    {
      invariantKind: "departure",
      statement: "A run may be narrowed to named rows.",
    },
  ],
} as const satisfies Module
