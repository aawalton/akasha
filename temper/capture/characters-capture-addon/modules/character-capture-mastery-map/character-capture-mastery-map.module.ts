import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureMasteryMap = {
  id: "01a15ecc-78d0-7c02-a04a-0b40b9c7ff4d",
  type: "page-type/module",
  slug: "character-capture-mastery-map",
  definition: "each class mastery's game ability id against its place in a build hash",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the bit a saved build hash has for that mastery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each place is the hash place a class mastery page states, compiled in from those pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ability no class mastery page states has no place.",
    },
  ],
  createdAt: "2026-10-21T14:10:21.007Z",
  updatedAt: "2026-10-21T14:10:21.007Z",
} as const satisfies Module
