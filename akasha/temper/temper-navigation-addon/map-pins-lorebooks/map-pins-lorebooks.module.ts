import type { Module } from "@akasha/code-system/module"

export const mapPinsLorebooks = {
  id: "01a06269-2ade-760e-a9a4-8609443a2be8",
  pageTypeSlug: "module",
  slug: "map-pins-lorebooks",
  definition: "the lore book pin places by zone, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
