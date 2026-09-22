import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogApiTest = {
  id: "01a063ba-94e5-7e5c-ad37-4144ed456b26",
  type: "page-type/module",
  slug: "catalog-api-test",
  definition: "the call per catalog that says whether the game answers it at all",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game call is made inside a protected call so a missing name is caught.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer of zero is a failure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every group is tried before anything is printed.",
    },
  ],
} as const satisfies Module
