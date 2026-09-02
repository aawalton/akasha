import type { Module } from "@akasha/code-system/module"

export const mapPinsVolendrung = {
  id: "01a06269-2b0d-7cd2-b04c-3b0534fc7eba",
  pageTypeSlug: "module",
  slug: "map-pins-volendrung",
  definition: "the Volendrung places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
