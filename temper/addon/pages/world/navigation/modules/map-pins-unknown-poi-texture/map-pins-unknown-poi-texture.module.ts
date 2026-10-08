import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsUnknownPoiTexture = {
  id: "01a06269-2b0c-7607-85b8-7b256dda7339",
  type: "page-type/module",
  slug: "map-pins-unknown-poi-texture",
  definition: "the texture of each unknown point-of-interest kind",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.604Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
