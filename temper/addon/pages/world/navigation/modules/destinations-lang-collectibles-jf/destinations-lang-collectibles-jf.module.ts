import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangCollectiblesJf = {
  id: "01a06269-29f4-7c37-acc6-fc4631895396",
  type: "page-type/module",
  slug: "destinations-lang-collectibles-jf",
  definition: "the collectible names in Japanese with English fallbacks",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
