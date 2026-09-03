import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const noveltyBudget = {
  id: "01a0685e-89d5-70b9-adaf-19dd42d605c2",
  pageTypeSlug: "module",
  slug: "novelty-budget",
  definition: "which starved slot a session spends its one introduction on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slot is starved where every movement that could fill it is unlogged.",
    },
    {
      invariantKind: "departure",
      statement: "A slot whose pattern was never trained is introduced ahead of one whose was.",
    },
    {
      invariantKind: "departure",
      statement: "Where two slots are alike the earlier in the session takes the introduction.",
    },
    {
      invariantKind: "departure",
      statement: "A session with no starved slot reserves nothing.",
    },
  ],
} as const satisfies Module
