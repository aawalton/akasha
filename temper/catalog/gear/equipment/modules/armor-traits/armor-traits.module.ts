import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorTraits = {
  id: "01a0610f-45b9-7cd1-b86c-956394916d9b",
  type: "page-type/module",
  slug: "armor-traits",
  definition: "every property a piece of player armor is worked with, and what each is worth",
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
  hashIndexed: ["ARMOR_TRAIT_DATA"],
} as const satisfies Module
