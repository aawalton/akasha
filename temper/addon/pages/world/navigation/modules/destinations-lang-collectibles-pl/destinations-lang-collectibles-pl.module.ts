import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangCollectiblesPl = {
  id: "01a06269-29f6-7a15-b7bc-cff435be22c2",
  type: "page-type/module",
  slug: "destinations-lang-collectibles-pl",
  definition: "the collectible names in Polish",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.326Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
