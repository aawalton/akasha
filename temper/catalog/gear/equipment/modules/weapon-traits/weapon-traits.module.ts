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
      statement: "This table is written out from the trait pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A trait's place in this table is the index a build hash has.",
    },
  ],
  hashIndexed: ["WEAPON_TRAIT_DATA"],
} as const satisfies Module
