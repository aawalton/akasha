import type { Module } from "@akasha/code-system/module"

export const mapPinsInstrumentsTooltip = {
  id: "01a06269-2acc-729c-abb2-9a82ae72abfe",
  pageTypeSlug: "module",
  slug: "map-pins-instruments-tooltip",
  definition: "the tooltip of each instrument",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
