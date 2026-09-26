import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const consolidationMigrationsWorld = {
  id: "01a0de93-2c05-70ba-a4b1-e147c151e6ec", type: "page-type/module",
  slug: "consolidation-migrations-world",
  definition: "which saved variables move into the world add-on's when addons are folded into it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "More Markers' saved variables are carried into the world add-on under its own names.",
    },
  ],
} as const satisfies Module
