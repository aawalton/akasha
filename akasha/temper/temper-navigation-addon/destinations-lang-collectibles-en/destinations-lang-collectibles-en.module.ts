import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesEn = {
  id: "01a06269-29f1-78c7-a141-6f8a6d7a6cae",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-en",
  definition: "the collectible names in English",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
