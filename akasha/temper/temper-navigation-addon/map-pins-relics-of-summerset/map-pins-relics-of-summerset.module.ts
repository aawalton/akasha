import type { Module } from "@akasha/code-system/module"

export const mapPinsRelicsOfSummerset = {
  id: "01a06269-2ae8-712d-a015-38014478c2d9",
  pageTypeSlug: "module",
  slug: "map-pins-relics-of-summerset",
  definition: "the Summerset relic places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
