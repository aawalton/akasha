import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAudibleMigration = {
  id: "01a06866-06f1-7168-a141-d8d56c28cd00",
  pageTypeSlug: "module",
  slug: "monarch-audible-migration",
  definition:
    "the Audible charges already standing, carried onto the budget scheme that replaced them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A charge is either transferred, recategorized only, or already done, and which it is is decided before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "A charge already carrying the Audible category is done rather than moved again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A charge is found by the word Audible in its merchant, its statement line or its note, so a row the bank spelled differently is still reached.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row this scheme itself wrote is passed over, so a run does not migrate its own work.",
    },
    {
      invariantKind: "departure",
      statement:
        "A credit, an uncategorized charge and a charge whose note says it was reimbursed are recategorized rather than transferred.",
    },
    {
      invariantKind: "departure",
      statement:
        "History is carried from the first of January two thousand and twenty-five onward and no earlier.",
    },
    {
      invariantKind: "departure",
      statement: "What decided is recorded as this migration rather than as a rule.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run may be narrowed to named rows, so a migration can be tried on one before all.",
    },
  ],
} as const satisfies Module
