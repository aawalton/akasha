import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangCollectiblesDe = {
  id: "01a06269-29f0-75f0-885d-214d0a4f8375",
  type: "page-type/module",
  slug: "destinations-lang-collectibles-de",
  definition: "the collectible names in German",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.320Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
