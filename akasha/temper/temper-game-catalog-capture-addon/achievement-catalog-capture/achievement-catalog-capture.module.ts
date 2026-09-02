import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const achievementCatalogCapture = {
  id: "01a060e2-3182-7542-b21a-251c92e9d95d",
  pageTypeSlug: "module",
  slug: "achievement-catalog-capture",
  definition: "the achievements by category, read in batches into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "An achievement line is followed from its first achievement onward.",
    },
    {
      invariantKind: "departure",
      statement: "An achievement already seen is not added a second time.",
    },
    {
      invariantKind: "departure",
      statement: "Achievements are read in batches so the client keeps its frame rate.",
    },
  ],
} as const satisfies Module
