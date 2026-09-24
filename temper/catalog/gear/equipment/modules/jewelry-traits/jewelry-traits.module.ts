import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jewelryTraits = {
  id: "01a0610f-45bb-7e6d-9e65-09ec21c0cff3",
  type: "page-type/module",
  slug: "jewelry-traits",
  definition: "every property a piece of player jewelry is worked with, and what each is worth",
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
  hashIndexed: ["JEWELRY_TRAIT_DATA"],
} as const satisfies Module
