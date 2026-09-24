import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const traitResearchCatalog = {
  id: "01a0604d-23a1-7d86-bd37-fe6a4b83b186",
  type: "page-type/module",
  slug: "trait-research-catalog",
  definition: "the traits a crafter researches, held under craft types and research lines",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft type has research lines that have traits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait has only its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
  ],
} as const satisfies Module
