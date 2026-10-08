import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsShrines = {
  id: "01a06269-2aeb-7c0a-baa7-669d1bec812d",
  type: "page-type/module",
  slug: "map-pins-shrines",
  definition: "the shrine places by zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.571Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
