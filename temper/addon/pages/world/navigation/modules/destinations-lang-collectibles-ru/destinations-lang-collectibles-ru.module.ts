import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangCollectiblesRu = {
  id: "01a06269-29f8-74f4-a5b7-56899e9afc49",
  type: "page-type/module",
  slug: "destinations-lang-collectibles-ru",
  definition: "the collectible names in Russian",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.328Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
