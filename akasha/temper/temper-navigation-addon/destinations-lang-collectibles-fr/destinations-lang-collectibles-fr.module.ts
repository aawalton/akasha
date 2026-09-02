import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesFr = {
  id: "01a06269-29f2-778d-bc57-3fffe545fa46",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-fr",
  definition: "the collectible names in French",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
