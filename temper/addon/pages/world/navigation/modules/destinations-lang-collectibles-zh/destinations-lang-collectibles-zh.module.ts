import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangCollectiblesZh = {
  id: "01a06269-29f9-7223-a5fa-ad1fd719e4f6",
  type: "page-type/module",
  slug: "destinations-lang-collectibles-zh",
  definition: "the collectible names in Chinese",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
