import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesJp = {
  id: "01a06269-29f5-712a-a72f-2d936849ae22",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-jp",
  definition: "the collectible names in Japanese",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
