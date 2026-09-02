import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesFx = {
  id: "01a06269-29f3-7d8b-898f-9f202843d3b3",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-fx",
  definition: "the collectible names in French with English fallbacks",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
