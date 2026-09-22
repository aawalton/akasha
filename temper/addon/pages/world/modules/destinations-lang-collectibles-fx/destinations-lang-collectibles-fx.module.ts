import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangCollectiblesFx = {
  id: "01a06269-29f3-7d8b-898f-9f202843d3b3",
  type: "page-type/module",
  slug: "destinations-lang-collectibles-fx",
  definition: "the collectible names in French with English fallbacks",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
