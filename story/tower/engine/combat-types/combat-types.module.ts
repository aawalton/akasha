import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const combatTypes = {
  id: "01a05bc6-fa4a-7006-a05a-999535e277bf",
  pageTypeSlug: "module",
  slug: "combat-types",
  definition: "the shapes a combatant, a die roll and an attack are written in here",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A combatant is known here by less than the sheet it was stored as.",
    },
    {
      invariantKind: "departure",
      statement: "An attack is physical or mental.",
    },
    {
      invariantKind: "departure",
      statement: "A seed is part of what an attack is handed rather than held between attacks.",
    },
  ],
} as const satisfies Module
