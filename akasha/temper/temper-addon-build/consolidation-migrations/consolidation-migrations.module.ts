import type { Module } from "@akasha/code-system/module"

export const consolidationMigrations = {
  id: "01a06038-2cc2-79bf-bf75-d6b79d64ce35",
  pageTypeSlug: "module",
  slug: "consolidation-migrations",
  definition: "which addon's saved variables move where when addons are folded together",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A migration runs only for the addon the migration names.",
    },
    {
      invariantKind: "departure",
      statement: "The saved variables of an absorbed addon are appended to the absorbing addon's.",
    },
    {
      invariantKind: "departure",
      statement:
        "A migration for an addon that only changed name renames the saved variables in place.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every migration here answers to the type the module applying a migration declares.",
    },
  ],
} as const satisfies Module
