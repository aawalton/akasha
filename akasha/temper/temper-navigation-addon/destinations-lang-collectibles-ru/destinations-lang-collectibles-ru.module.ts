import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesRu = {
  id: "01a06269-29f8-74f4-a5b7-56899e9afc49",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-ru",
  definition: "the collectible names in Russian",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
