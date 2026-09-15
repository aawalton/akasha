import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const consolidationMigrations = {
  id: "01a06038-2cc2-79bf-bf75-d6b79d64ce35",
  type: "module",
  slug: "consolidation-migrations",
  definition: "which addon's saved variables move where when addons are folded together",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A migration runs only for the addon the migration names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved variables of an absorbed addon are appended to the absorbing addon's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A migration for an addon that only changed name renames the saved variables in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every migration here answers to the type the module applying a migration declares.",
    },
  ],
} as const satisfies Module
