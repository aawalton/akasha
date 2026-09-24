import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const achievementCatalog = {
  id: "01a0604d-239a-7f6e-9caa-f6928757f48a",
  type: "page-type/module",
  slug: "achievement-catalog",
  definition: "the achievements the game lists, held under categories and subcategories",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category has sub categories that have achievements.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A general sub category is optional on a category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry says whether the achievement is earned per character.",
    },
  ],
} as const satisfies Module
