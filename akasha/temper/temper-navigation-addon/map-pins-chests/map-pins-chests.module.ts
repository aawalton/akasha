import type { Module } from "@akasha/code-system/module"

export const mapPinsChests = {
  id: "01a06269-2aa5-756c-ad77-b14fb21f4b06",
  pageTypeSlug: "module",
  slug: "map-pins-chests",
  definition: "the treasure chest places by zone, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
