import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests = {
  id: "01a06269-2aa5-756c-ad77-b14fb21f4b06",
  type: "page-type/module",
  slug: "map-pins-chests",
  definition: "the treasure chest places by zone, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.501Z",
  updatedAt: "2026-09-22T14:17:06.000Z",
} as const satisfies Module
