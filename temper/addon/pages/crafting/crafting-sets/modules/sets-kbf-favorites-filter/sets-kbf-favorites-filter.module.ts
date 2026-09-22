import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsKbfFavoritesFilter = {
  id: "01a0623e-53a1-7630-820e-af044a097b87",
  type: "page-type/module",
  slug: "sets-kbf-favorites-filter",
  definition: "the dropdown of favourite categories a set can be marked with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The first entry of the dropdown covers sets marked with no favourite.",
    },
  ],
} as const satisfies Module
