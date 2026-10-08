import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsLorebooks = {
  id: "01a06269-2ade-760e-a9a4-8609443a2be8",
  type: "page-type/module",
  slug: "map-pins-lorebooks",
  definition: "the lore book pin places by zone, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.558Z",
  updatedAt: "2026-09-22T14:18:53.000Z",
} as const satisfies Module
