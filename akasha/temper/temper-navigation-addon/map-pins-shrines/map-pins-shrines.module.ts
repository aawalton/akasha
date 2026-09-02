import type { Module } from "@akasha/code-system/module"

export const mapPinsShrines = {
  id: "01a06269-2aeb-7c0a-baa7-669d1bec812d",
  pageTypeSlug: "module",
  slug: "map-pins-shrines",
  definition: "the shrine places by zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
