import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponTraits = {
  id: "01a0610f-45bb-7d20-aedf-7d954ebf2ec5",
  type: "page-type/module",
  slug: "weapon-traits",
  definition: "every property a piece of player weapon is worked with, and what each is worth",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The weapon traits are read from the weapon trait pages and held.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A trait's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build may pick the traits whose pages state them available.",
    },
  ],
} as const satisfies Module
