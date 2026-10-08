import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangCollectiblesFr = {
  id: "01a06269-29f2-778d-bc57-3fffe545fa46",
  type: "page-type/module",
  slug: "destinations-lang-collectibles-fr",
  definition: "the collectible names in French",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.322Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
