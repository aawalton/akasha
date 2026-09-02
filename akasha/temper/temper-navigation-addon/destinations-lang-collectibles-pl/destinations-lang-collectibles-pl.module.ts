import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesPl = {
  id: "01a06269-29f6-7a15-b7bc-cff435be22c2",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-pl",
  definition: "the collectible names in Polish",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
