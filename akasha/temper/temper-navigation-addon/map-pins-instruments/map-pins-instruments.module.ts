import type { Module } from "@akasha/code-system/module"

export const mapPinsInstruments = {
  id: "01a06269-2acb-7131-a13b-1d6645bb0430",
  pageTypeSlug: "module",
  slug: "map-pins-instruments",
  definition: "the instrument places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
