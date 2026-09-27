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
      statement: "The jewelry traits are read from the jewelry trait pages and held.",
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
