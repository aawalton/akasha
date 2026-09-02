import type { Module } from "@akasha/code-system/module"

export const mapPinsFishIcon = {
  id: "01a06269-2aa7-796f-9777-7ed391d39ca9",
  pageTypeSlug: "module",
  slug: "map-pins-fish-icon",
  definition: "the icon of each fish",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
