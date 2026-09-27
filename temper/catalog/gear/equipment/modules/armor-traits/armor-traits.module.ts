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
      statement: "The armor traits are read from the armor trait pages and held.",
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
